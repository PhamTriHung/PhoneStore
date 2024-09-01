import { IsIn, IsInt, IsUUID, Min } from 'class-validator';

export class MakeOrderDto {
  @IsUUID(4)
  userId: string;

  @IsUUID(4)
  productId: string;

  @IsUUID(4)
  storeId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}
