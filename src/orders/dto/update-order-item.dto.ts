import { OrderItem } from 'src/orders/order-item.entity';
import { PartialType } from '@nestjs/swagger';

export class UpdateOrderItemDto extends PartialType(OrderItem) {}
