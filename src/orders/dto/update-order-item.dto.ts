import { OrderItem } from 'src/order-items/order-item.entity';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateOrderItemDto extends PartialType(OrderItem) {}
