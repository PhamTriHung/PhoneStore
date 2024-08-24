import { Product } from 'src/products/products.entity';
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
  UpdateResult,
} from 'typeorm';
import { FilterProductDto } from './dto/filter-product.dto';
import { Brand } from 'src/brands/brand.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductType } from 'src/product-type/product-type.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
    @InjectRepository(ProductType)
    private productTypeRepository: Repository<ProductType>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { brandId, productTypeId, ...product } = createProductDto;

    const newProduct = this.productRepository.create(createProductDto);

    if (brandId) {
      newProduct.brand = await this.brandRepository.findOne({
        where: { id: brandId },
      });
    }

    if (productTypeId) {
      newProduct.productType = await this.productTypeRepository.findOne({
        where: { id: productTypeId },
      });
    }

    return this.productRepository.save(newProduct);
  }

  async find(filterProductDto: FilterProductDto): Promise<Product[]> {
    const { lowestPrice, highestPrice, brandId, productTypeId } =
      filterProductDto;
    const findProductOptionsWhere: FindOptionsWhere<Product | Product[]> = {};

    if (lowestPrice && highestPrice) {
      findProductOptionsWhere.price = Between(lowestPrice, highestPrice);
    } else if (lowestPrice) {
      findProductOptionsWhere.price = MoreThan(lowestPrice);
    } else if (highestPrice) {
      findProductOptionsWhere.price = LessThan(highestPrice);
    } else if (brandId) {
      findProductOptionsWhere.brand = await this.brandRepository.findOne({
        where: { id: brandId },
      });
    } else if (productTypeId) {
      findProductOptionsWhere.productType =
        await this.productTypeRepository.findOne({
          where: { id: productTypeId },
        });
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

  deleteManyByIds(ids: string[]): Promise<DeleteResult> {
    return this.productRepository.delete({ id: In(ids) });
  }

  async updateProductById(
    updateProductDto: UpdateProductDto,
  ): Promise<UpdateResult> {
    const { id, brandId, productTypeId, ...product } = updateProductDto;

    if (brandId) {
      product.brand = await this.brandRepository.findOne({
        where: { id: brandId },
      });
    }

    if (productTypeId) {
      product.productType = await this.productTypeRepository.findOne({
        where: { id: productTypeId },
      });
    }

    return this.productRepository.update({ id }, product);
  }
}
