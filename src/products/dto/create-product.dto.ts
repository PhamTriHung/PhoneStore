import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Product } from '../products.entity';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9\s-]+$/, {
    message:
      'Product name can only contain letters, numbers, spaces, and hyphens.',
  })
  @ApiProperty({ default: 'Product name' })
  name: string;

  @IsNumber()
  @IsPositive()
  @Min(1000)
  @Max(200000000)
  price: number;

  @IsOptional()
  @IsBoolean()
  isInStock?: boolean;

  @IsOptional()
  @IsUUID(4)
  categoryId?: string;

  @IsOptional()
  @IsUUID(4, { each: true })
  categoryTagCategoryIds?: string[];

  @IsOptional()
  @IsUUID(4, { each: true })
  attributeValueIds?: string[];
}
