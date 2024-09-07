import { PickType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
} from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class FilterProductDto extends PickType(CreateProductDto, ['slug']) {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  lowestPrice?: number;

  @IsNumber()
  @IsOptional()
  highestPrice?: number;

  @IsUUID(4)
  @IsOptional()
  categoryId?: string;

  @IsUUID(4, { each: true })
  @IsOptional()
  categoryTagCategoryIds?: string[];

  @IsBoolean()
  @IsOptional()
  isMonopoly: boolean;

  @IsBoolean()
  @IsOptional()
  isNew: boolean;

  @IsBoolean()
  @IsOptional()
  isDiscount: boolean;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  orderType: 'asc' | 'desc';
}
