import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Store } from './store.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { findEntityById } from 'src/utils/database-utils';
import { Ward } from 'src/addresses/ward.entity';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store) private storeRepository: Repository<Store>,
    @InjectRepository(Ward) private wardRepository: Repository<Ward>,
  ) {}

  async create(createStoreDto: CreateStoreDto): Promise<Store> {
    const { wardId, ...otherField } = createStoreDto;
    const newStore = this.storeRepository.create(otherField);

    if (wardId) {
      const ward = await findEntityById(this.wardRepository, wardId);
      newStore.ward = ward;
    }

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

  async update(id: string, updateStoreDto: UpdateStoreDto) {
    const store = await findEntityById(this.storeRepository, id);

    const { wardId, ...otherField } = updateStoreDto;

    if (wardId) {
      const ward = await findEntityById(this.wardRepository, wardId);

      store.ward = ward;
    }

    await this.storeRepository.update(
      { id },
      {
        ...store,
        ...otherField,
      },
    );

    return await findEntityById(this.storeRepository, id);
  }

  async delete(id: string) {
    const store = await findEntityById(this.storeRepository, id);
    return this.storeRepository.remove(store);
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
