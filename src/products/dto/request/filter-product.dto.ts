import { PickType } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
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
}
