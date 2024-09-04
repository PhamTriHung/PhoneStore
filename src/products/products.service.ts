import { Product } from 'src/products/products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  Between,
  FindOptionsWhere,
  In,
  LessThan,
  MoreThan,
  Repository,
  UpdateResult,
} from 'typeorm';
import { FilterProductDto } from './dto/filter-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from 'src/categories/category.entity';
import { Tag } from 'src/tags/tag.entity';
import { AttributeValue } from 'src/attributes/attribute-value.entity';
import { Variant } from 'src/variants/variant.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Tag) private tagRepository: Repository<Tag>,
    @InjectRepository(AttributeValue)
    private attributeValuesRepsitory: Repository<AttributeValue>,
    @InjectRepository(Variant) private variantRepository: Repository<Variant>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { categoryId, tagIds, attributeValueIds, ...product } =
      createProductDto;

    const newProduct = this.productRepository.create(product);
    const baseVariant = this.variantRepository.create();

    newProduct.variants = [baseVariant];

    if (categoryId) {
      newProduct.category = await this.categoryRepository.findOneBy({
        id: categoryId,
      });
    }

    if (tagIds && tagIds.length > 0) {
      newProduct.tags = await this.tagRepository.findBy({ id: In(tagIds) });
    }

    if (attributeValueIds && attributeValueIds.length > 0) {
      baseVariant.attributeValues = await this.attributeValuesRepsitory.findBy({
        id: In(attributeValueIds),
      });
    }

    return this.productRepository.save(newProduct);
  }

  async find(filterProductDto: FilterProductDto): Promise<Product[]> {
    const { lowestPrice, highestPrice, categoryId, tagIds } = filterProductDto;
    const findProductOptionsWhere: FindOptionsWhere<Product | Product[]> = {};

    if (lowestPrice && highestPrice) {
      findProductOptionsWhere.price = Between(lowestPrice, highestPrice);
    } else if (lowestPrice) {
      findProductOptionsWhere.price = MoreThan(lowestPrice);
    } else if (highestPrice) {
      findProductOptionsWhere.price = LessThan(highestPrice);
    } else if (categoryId) {
      findProductOptionsWhere.category = await this.categoryRepository.findOne({
        where: { id: categoryId },
      });
    } else if (tagIds) {
      findProductOptionsWhere.tags = await this.tagRepository.findBy({
        id: In(tagIds),
      });

      return Object.keys(findProductOptionsWhere).length > 0
        ? this.productRepository.find({ where: findProductOptionsWhere })
        : this.productRepository.find();
    }
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product with Id ${id} not found`);
    } else {
      return product;
    }
  }

  async deleteById(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with Id ${id} not found`);
    } else {
      return this.productRepository.remove(product);
    }
  }

  async deleteManyByIds(ids: string[]): Promise<Product[]> {
    const products = await this.productRepository.find({
      where: { id: In(ids) },
    });

    return this.productRepository.remove(products);
  }

  async updateProductById(
    updateProductDto: UpdateProductDto,
  ): Promise<UpdateResult> {
    const { id, categoryId, tagIds, ...product } = updateProductDto;

    if (categoryId) {
      product.category = await this.categoryRepository.findOne({
        where: { id: categoryId },
      });
    }

    if (tagIds && tagIds.length > 0) {
      product.tags = await this.tagRepository.findBy({ id: In(tagIds) });
    }

    return this.productRepository.update({ id }, product);
  }
}
