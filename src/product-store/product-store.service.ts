import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductStore } from './product-store.entity';
import { Repository, UpdateResult } from 'typeorm';
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

  update(updateProductStoreDto: UpdateProductStoreDto): Promise<UpdateResult> {
    const { variantId, storeId, ...productStore } = updateProductStoreDto;

    return this.productStoreRepository.update(
      { variantId, storeId },
      productStore,
    );
  }

  async delete(deleteProductStoreDto: DeleteProductStoreDto) {
    const productStore = await this.productStoreRepository.findOne({
      where: deleteProductStoreDto,
    });

    if (!productStore) {
      throw new NotFoundException(
        `Product store with variantId ${deleteProductStoreDto.variantId} and storeId ${deleteProductStoreDto.storeId} not found`,
      );
    } else {
      return this.productStoreRepository.remove(productStore);
    }
  }
}
