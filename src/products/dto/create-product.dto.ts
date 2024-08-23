import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNumber, IsPositive, IsString } from 'class-validator';
import { Product } from '../products.entity';

export class CreateProductDto extends PartialType(Product) {
  @IsString()
  name: string;

  @IsNumber()
  @IsPositive({ message: 'Price must be greater than 0' })
  price: number;

  @IsBoolean({ message: 'Please use boolean value for this field' })
  isInStock: boolean;
}
