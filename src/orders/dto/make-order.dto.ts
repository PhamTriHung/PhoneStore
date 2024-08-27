import { IsUUID } from 'class-validator';

export class MakeOrderDto {
  @IsUUID(4)
  userId: string;

  @IsUUID(4)
  productId: string;

  quantity: number;
}
