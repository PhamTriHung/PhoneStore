import { CreateAttributeValueDto } from './dto/create-attribute-value.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attribute } from './attribute.entity';
import { In, Repository } from 'typeorm';
import { AttributeValue } from './attribute-value.entity';
import { UpdateAttributeValueDto } from './dto/update-attribute-value.dto';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { createECDH } from 'crypto';

@Injectable()
export class AttributesService {
  constructor(
    @InjectRepository(Attribute)
    private attributesRepository: Repository<Attribute>,
    @InjectRepository(AttributeValue)
    private attributeValuesRepository: Repository<AttributeValue>,
  ) {}

  // Attribut value
  async createAttributeValue(createAttributeValueDto: CreateAttributeValueDto) {
    const { attributeId } = createAttributeValueDto;
    const newAttributeValue = this.attributeValuesRepository.create(
      createAttributeValueDto,
    );

    if (attributeId) {
      newAttributeValue.attribute = await this.findAttributeById(attributeId);
    }

    return this.attributeValuesRepository.save(newAttributeValue);
  }

  findAllAttributeValue() {
    return this.attributeValuesRepository.find();
  }

  async findAttributeValueById(id: string) {
    const attributeValue = await this.attributeValuesRepository.findOneBy({
      id,
    });

    if (!attributeValue) {
      throw new NotFoundException(`Attribute value with id ${id} not found`);
    } else {
      return attributeValue;
    }
  }

  async updateAttributeValueById(
    id: string,
    updateAttributeValueDto: UpdateAttributeValueDto,
  ) {
    const { attributeId } = updateAttributeValueDto;
    const attributeValue = this.attributeValuesRepository.create();

    if (attributeId) {
      attributeValue.attribute = await this.findAttributeById(attributeId);
    }

    await this.attributeValuesRepository.update(
      { id },
      updateAttributeValueDto,
    );

    return this.attributeValuesRepository.findOneBy({ id });
  }

  async deleteAttributeValueById(id: string) {
    const attributeValue = await this.findAttributeValueById(id);

    return this.attributeValuesRepository.remove(attributeValue);
  }

  async deleteMultipleAttributeValueByIds(ids: string[]) {
    const attributeValues = await this.attributeValuesRepository.findBy({
      id: In(ids),
    });

    if (attributeValues.length !== ids.length) {
      const foundIds = attributeValues.map((attr) => attr.id);
      const notFoundIds = ids.filter((id) => !foundIds.includes(id));

      throw new NotFoundException(
        `Attribute values not found for IDs: ${notFoundIds.join(', ')}`,
      );
    } else {
      return this.attributeValuesRepository.remove(attributeValues);
    }
  }

  //   Attribute
  createAttribute(createAttributeDto: CreateAttributeDto) {
    const newAttribute = this.attributesRepository.create(createAttributeDto);

    return this.attributesRepository.save(newAttribute);
  }

  findAllAttribute() {
    return this.attributesRepository.find();
  }

  async findAttributeById(id: string) {
    const attribute = await this.attributesRepository.findOneBy({ id });

    if (!attribute) {
      throw new NotFoundException(`Attribute with id ${id} not found`);
    } else {
      return attribute;
    }
  }

  async updateAttributeById(
    id: string,
    updateAttributeDto: UpdateAttributeDto,
  ) {
    await this.attributesRepository.update({ id }, updateAttributeDto);

    return this.attributesRepository.findOneBy({ id });
  }

  async deleteAttributeById(id: string) {
    const attribute = await this.findAttributeById(id);

    return this.attributesRepository.remove(attribute);
  }
}
