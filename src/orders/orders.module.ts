import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from 'src/orders/order-item.entity';
import { Order } from './order.entity';
import { User } from 'src/users/users.entity';
import { ProductStore } from 'src/product-store/product-store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, User, ProductStore])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
