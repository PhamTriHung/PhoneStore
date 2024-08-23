import { PartialType } from '@nestjs/mapped-types';
import { Brand } from '../brand.entity';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBrandDto extends PartialType(Brand) {
  @IsString()
  @IsNotEmpty()
  brandName: string;
}
