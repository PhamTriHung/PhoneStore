import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { ProductType } from './product-type.entity';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';

@Injectable()
export class ProductTypesService {
  constructor(
    @InjectRepository(ProductType)
    private productTypeRepository: Repository<ProductType>,
  ) {}

  create(createProductTypeDto: CreateProductTypeDto): Promise<ProductType> {
    const newProductType =
      this.productTypeRepository.create(createProductTypeDto);

    return this.productTypeRepository.save(newProductType);
  }

  find(): Promise<ProductType[]> {
    return this.productTypeRepository.find();
  }

  findOneById(id: string): Promise<ProductType> {
    return this.productTypeRepository.findOne({ where: { id } });
  }

  // hes loo
  // holaaaaaaaaaaaa

  deleteById(id: string): Promise<DeleteResult> {
    return this.productTypeRepository.delete(id);
  }

  deleteManyByIds(ids: string[]): Promise<DeleteResult> {
    return this.productTypeRepository.delete({ id: In(ids) });
  }

  updateById(
    updateProductTypeDto: UpdateProductTypeDto,
  ): Promise<UpdateResult> {
    const { id, value } = updateProductTypeDto;
    return this.productTypeRepository.update({ id }, { value });
  }
}
