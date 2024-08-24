import { PartialType } from '@nestjs/mapped-types';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ProductType } from '../product-type.entity';

export class CreateProductTypeDto extends PartialType(ProductType) {
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9\s-]+$/, {
    message:
      'Product name can only contain letters, numbers, spaces, and hyphens.',
  })
  value: string;
}
