import { IsInt, IsUUID, Min } from 'class-validator';
import { CreateOrderItemDto } from './create-order-item.dto';

export class CreateOrderDto {
  @IsUUID(4)
  userId: string;

  orderItems: CreateOrderItemDto[];
}
