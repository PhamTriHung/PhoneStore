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

export class FilterProductDto {
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

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  @Matches(/^[a-zA-Z-]+$/, {
    message:
      'Product slug can only contain letters, numbers, spaces, and hyphens.',
  })
  slug: string;
}
