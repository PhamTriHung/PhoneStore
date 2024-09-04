import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Variant } from './variant.entity';
import { CreateVariantDto } from './dto/create-variant.dto';
import { Product } from 'src/products/products.entity';
import { AttributeValue } from 'src/attributes/attribute-value.entity';
import { UpdateVariantDto } from './dto/update-variant.dto';

@Injectable()
export class VariantsService {
  constructor(
    @InjectRepository(Variant) private variantsRepository: Repository<Variant>,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(AttributeValue)
    private attributeValuesRepository: Repository<AttributeValue>,
  ) {}

  async createVariant(createVariantDto: CreateVariantDto) {
    const { productId, attributeValueIds } = createVariantDto;

    const newVariant = this.variantsRepository.create({});

    if (productId) {
      const product = await this.productsRepository.findOneBy({
        id: productId,
      });

      if (!product) {
        throw new NotFoundException(`Product with id ${productId} not found`);
      } else {
        newVariant.product = product;
      }
    }

    if (attributeValueIds && attributeValueIds.length > 0) {
      const attributeValues = await this.attributeValuesRepository.findBy({
        id: In(attributeValueIds),
      });

      if (attributeValueIds.length !== attributeValues.length) {
        const foundIds = attributeValues.map(
          (attributeValue) => attributeValue.id,
        );
        const notFoundIds = attributeValueIds.filter(
          (id) => !foundIds.includes(id),
        );

        throw new NotFoundException(
          `Attribute value not found for ids ${notFoundIds.join(', ')}`,
        );
      } else {
        newVariant.attributeValues = attributeValues;
      }
    }

    return this.variantsRepository.save(newVariant);
  }

  findAllVariant() {
    return this.variantsRepository.find();
  }

  findVariantById(id: string) {
    return this.variantsRepository.findOneBy({ id });
  }

  async updateVariantById(id: string, updateVariantDto: UpdateVariantDto) {
    const { productId, attributeValueIds } = updateVariantDto;
    const variant = this.variantsRepository.create({});

    if (productId) {
      const product = await this.productsRepository.findOneBy({
        id: productId,
      });

      if (!product) {
        throw new NotFoundException(`Product with id ${productId} not found`);
      } else {
        variant.product = product;
      }
    }

    if (attributeValueIds && attributeValueIds.length > 0) {
      const attributeValues = await this.attributeValuesRepository.findBy({
        id: In(attributeValueIds),
      });

      if (attributeValueIds.length !== attributeValues.length) {
        const foundIds = attributeValues.map(
          (attributeValue) => attributeValue.id,
        );
        const notFoundIds = attributeValueIds.filter(
          (id) => !foundIds.includes(id),
        );

        throw new NotFoundException(
          `Attribute value not found for ids ${notFoundIds.join(', ')}`,
        );
      } else {
        variant.attributeValues = attributeValues;
      }
    }

    await this.variantsRepository.update({ id }, variant);

    return this.variantsRepository.findOneBy({ id });
  }

  async deleteVariantById(id: string) {
    const variant = await this.variantsRepository.findOneBy({ id });

    return this.variantsRepository.remove(variant);
  }
}
