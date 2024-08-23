import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
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

  find() {
    return this.productTypeRepository.find();
  }

  findOneById(id: string) {
    return this.productTypeRepository.findOne({ where: { id } });
  }

  // hes loo
  // holaaaaaaaaaaaa

  deleteById(id: string) {
    return this.productTypeRepository.delete(id);
  }

  deleteManyByIds(ids: string[]) {
    return this.productTypeRepository.delete({ id: In(ids) });
  }

  updateById(updateProductTypeDto: UpdateProductTypeDto) {
    const { id, value } = updateProductTypeDto;
    return this.productTypeRepository.update({ id }, { value });
  }
}
