import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Product } from '../products.entity';

export class CreateProductDto extends PartialType(Product) {
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9\s-]+$/, {
    message:
      'Product name can only contain letters, numbers, spaces, and hyphens.',
  })
  name: string;

  @IsNumber()
  @IsPositive()
  @Min(1000)
  @Max(200000000)
  price: number;

  @IsBoolean()
  isInStock: boolean;
}
