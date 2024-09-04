import {
  ArgumentMetadata,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attribute } from '../attribute.entity';

export class ValidateAttributePipe implements PipeTransform {
  constructor(
    @InjectRepository(Attribute)
    private attributesRepository: Repository<Attribute>,
  ) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    const { attributeId } = value;

    const attribute = await this.attributesRepository.findOneBy({
      id: attributeId,
    });

    if (!attribute) {
      throw new NotFoundException(`Attribute with id ${attributeId} not found`);
    } else {
      return value;
    }
  }
}
