import { MakeOrderDto } from './dto/make-order.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderItem } from 'src/order-items/order-item.entity';
import { User } from 'src/users/users.entity';
import { Product } from 'src/products/products.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async makeOrder(makeOrderDtos: MakeOrderDto[]) {
    if (makeOrderDtos.length > 0) {
      const order = this.orderRepository.create({
        user: this.userRepository.create({ id: makeOrderDtos[0].userId }),
      });

      const orderItems = [];
      makeOrderDtos.forEach((carItem) => {
        const orderItem = this.orderItemRepository.create({
          quantity: carItem.quantity,
          product: this.productRepository.create({ id: carItem.productId }),
        });

        orderItems.push(orderItem);
      });

      order.orderItems = orderItems;

      return this.orderRepository.save(order);
    }
  }
}
