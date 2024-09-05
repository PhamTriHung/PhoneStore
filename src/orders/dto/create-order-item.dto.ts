import { IsUUID } from 'class-validator';

export class CreateOrderItemDto {
  @IsUUID('4')
  productStoreId: string;

  quantity: number;
}
