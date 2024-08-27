import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from 'src/order-items/order-item.entity';
import { Order } from './order.entity';
import { User } from 'src/users/users.entity';
import { Product } from 'src/products/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, User, Product])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
