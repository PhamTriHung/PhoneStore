import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductStore } from './product-store.entity';
import { In, Repository, UpdateResult } from 'typeorm';
import { CreateProductStoreDto } from './dto/create-product-store.dto';
import { UpdateProductStoreDto } from './dto/update-product-store.dto';
import { DeleteProductStoreDto } from './dto/delete-product-store.dto';

@Injectable()
export class ProductStoreService {
  constructor(
    @InjectRepository(ProductStore)
    private productStoreRepository: Repository<ProductStore>,
  ) {}

  create(createProductStoreDto: CreateProductStoreDto): Promise<ProductStore> {
    const newProductStore = this.productStoreRepository.create(
      createProductStoreDto,
    );

    return this.productStoreRepository.save(newProductStore);
  }

  find(): Promise<ProductStore[]> {
    return this.productStoreRepository.find();
  }

  update(
    id: string,
    updateProductStoreDto: UpdateProductStoreDto,
  ): Promise<UpdateResult> {
    return this.productStoreRepository.update({ id }, updateProductStoreDto);
  }

  async delete(id: string) {
    const productStore = await this.productStoreRepository.findOneBy({ id });

    if (!productStore) {
      throw new NotFoundException(`Product store with id ${id} not found`);
    } else {
      return this.productStoreRepository.remove(productStore);
    }
  }

  async deleteMultipleByIds(ids: string[]) {
    const productStores = await this.productStoreRepository.findBy({
      id: In(ids),
    });

    if (productStores.length !== ids.length) {
      const foundIds = productStores.map((productStore) => productStore.id);
      const notFoundIds = foundIds.filter((foundId) => !ids.includes(foundId));

      throw new NotFoundException(
        `Product store with ids ${notFoundIds} not found`,
      );
    } else {
      return this.productStoreRepository.remove(productStores);
    }
  }
}
