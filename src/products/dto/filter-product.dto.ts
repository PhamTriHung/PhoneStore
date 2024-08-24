import { IsPositive, IsUUID } from 'class-validator';

export class FilterProductDto {
  @IsPositive()
  lowestPrice: number;

  highestPrice: number;

  @IsUUID(4)
  brandId: string;

  @IsUUID(4)
  productTypeId: string;
}
