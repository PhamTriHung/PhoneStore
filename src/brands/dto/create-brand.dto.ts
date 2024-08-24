import { PartialType } from '@nestjs/mapped-types';
import { Brand } from '../brand.entity';
import {
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateBrandDto extends PartialType(Brand) {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9\s]+$/, {
    message: 'Brand name can only contain letters, numbers, and spaces.',
  })
  brandName: string;

  @IsOptional()
  @IsUUID(4)
  productTypeIds?: string[];
}
