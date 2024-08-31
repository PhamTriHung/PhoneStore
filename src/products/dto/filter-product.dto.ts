import { IsNumber, IsPositive, IsUUID } from 'class-validator';

export class FilterProductDto {
  @IsNumber()
  @IsPositive()
  lowestPrice: number;

  @IsNumber()
  highestPrice: number;

  @IsUUID(4)
  brandId: string;

  @IsUUID(4)
  productTypeId: string;
}
