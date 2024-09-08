import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Store } from './store.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store) private storeRepository: Repository<Store>,
  ) {}

  create(createStoreDto: CreateStoreDto): Promise<Store> {
    const newStore = this.storeRepository.create(createStoreDto);
    return this.storeRepository.save(newStore);
  }

  find() {
    return this.storeRepository.find();
  }

  async findById(id: string) {
    const store = await this.storeRepository.findOne({
      where: { id },
      relations: { productStores: { variant: { product: true } } },
    });

    if (!store) {
      throw new NotFoundException(`Store with id ${id} not found`);
    } else {
      return store;
    }
  }

  update(id: string, updateStoreDto: UpdateStoreDto) {
    return this.storeRepository.update({ id }, updateStoreDto);
  }

  async delete(id: string) {
    const store = await this.findById(id);
    return this.storeRepository.delete(id);
  }

  async deleteManyStoreById(ids: string[]) {
    const stores = await this.storeRepository.findBy({ id: In(ids) });

    if (stores.length !== ids.length) {
      const foundIds = stores.map((store) => store.id);
      const notFoundIds = ids.filter((id) => !foundIds.includes(id));

      throw new NotFoundException(
        `Store not found for ids ${notFoundIds.join(', ')}`,
      );
    } else {
      return this.storeRepository.remove(stores);
    }
  }
}
