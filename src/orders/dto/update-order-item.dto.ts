import { OrderItem } from 'src/orders/order-item.entity';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateOrderItemDto extends PartialType(OrderItem) {}
