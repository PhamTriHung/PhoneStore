import { MakeOrderDto } from './dto/make-order.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderItem } from 'src/order-items/order-item.entity';
import { User } from 'src/users/users.entity';
import { Product } from 'src/products/products.entity';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';

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

  async findOrderByUser(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    return this.orderRepository.find({
      where: { user },
      relations: {
        orderItems: {
          product: true,
        },
      },
      select: {
        orderItems: {
          productId: true,
          product: { name: true, price: true },
          quantity: true,
        },
      },
    });
  }

  findOrderByOrderId(id: string) {
    return this.orderRepository.findOne({
      where: { id },
      relations: {
        orderItems: {
          product: true,
        },
      },
      select: {
        orderItems: {
          productId: true,
          product: { name: true, price: true },
          quantity: true,
        },
      },
    });
  }

  deleteOrder(id: string) {
    return this.orderRepository.delete(id);
  }
}
