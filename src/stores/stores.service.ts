import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  update(updateStoreDto: UpdateStoreDto) {
    const { id, ...store } = updateStoreDto;
    return this.storeRepository.update({ id }, store);
  }

  delete(id: string) {
    this.storeRepository.delete(id);
  }
}
