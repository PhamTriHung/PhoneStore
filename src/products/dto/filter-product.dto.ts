import { IsNumber, IsOptional, IsPositive, IsUUID } from 'class-validator';

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
  tagIds?: string[];
}
