import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Injectable } from '@nestjs/common';
import {
  Between,
  DeleteResult,
  FindOptionsWhere,
  In,
  LessThan,
  MoreThan,
  Repository,
} from 'typeorm';
import { Product } from './products.entity';
import { FilterProductDto } from './dto/filter-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = this.productRepository.create(createProductDto);
    return this.productRepository.save(newProduct);
  }

  find(filterProductDto: FilterProductDto): Promise<Product[]> {
    const { lowestPrice, highestPrice } = filterProductDto;
    const findProductOptionsWhere: FindOptionsWhere<Product | Product[]> = {};

    if (lowestPrice && highestPrice) {
      findProductOptionsWhere.price = Between(lowestPrice, highestPrice);
    } else if (lowestPrice) {
      findProductOptionsWhere.price = MoreThan(lowestPrice);
    } else if (highestPrice) {
      findProductOptionsWhere.price = LessThan(highestPrice);
    }

    return Object.keys(findProductOptionsWhere).length > 0
      ? this.productRepository.find({ where: findProductOptionsWhere })
      : this.productRepository.find();
  }

  findById(id: string): Promise<Product> {
    return this.productRepository.findOne({ where: { id } });
  }

  deleteById(id: string): Promise<DeleteResult> {
    return this.productRepository.delete({ id });
  }

  deleteManyByIds(ids: string[]) {
    return this.productRepository.delete({ id: In(ids) });
  }
}
