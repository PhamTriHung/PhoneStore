import { MakeOrderDto } from './dto/make-order.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderItem } from 'src/orders/order-item.entity';
import { User } from 'src/users/users.entity';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { ProductStore } from 'src/product-store/product-store.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(ProductStore)
    private productStoreRepository: Repository<ProductStore>,
  ) {}

  async makeOrder(makeOrderDtos: MakeOrderDto[]) {
    if (makeOrderDtos.length > 0) {
      const order = this.orderRepository.create({
        user: this.userRepository.create({
          id: makeOrderDtos[0].userId,
        }),
      });

      const orderItems = [];
      makeOrderDtos.forEach((carItem) => {
        const orderItem = this.orderItemRepository.create({
          quantity: carItem.quantity,
          productStore: this.productStoreRepository.create({
            productId: carItem.productId,
            storeId: carItem.storeId,
          }),
        });

        orderItems.push(orderItem);
      });

      order.orderItems = orderItems;

      return this.orderRepository.save(order);
    }
  }

  async findOrderByUser(userId: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    } else {
      return this.orderRepository.find({
        where: { user },
        relations: {
          orderItems: { productStore: { product: true } },
        },
        select: {
          orderItems: {
            productStoreId: true,
            productStore: { product: { name: true, price: true } },
            quantity: true,
          },
        },
      });
    }
  }

  async findOrderByOrderId(id: string) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: { orderItems: { productStore: { product: true } } },
      select: {
        orderItems: {
          orderId: true,
          productStoreId: true,
          productStore: { product: { name: true, price: true } },
          quantity: true,
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    } else {
      return order;
    }
  }

  async deleteOrder(id: string) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: {
        orderItems: true,
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    } else {
      return this.orderRepository.remove(order);
    }
  }

  updateOrderItem(updateOrderItemDto: UpdateOrderItemDto) {
    const { productStoreId, orderId, ...orderItem } = updateOrderItemDto;
    return this.orderItemRepository.update(
      { productStoreId, orderId },
      orderItem,
    );
  }

  findAllOrder() {
    return this.orderRepository.find({
      relations: {
        orderItems: { productStore: { product: true } },
      },
      select: {
        orderItems: {
          productStoreId: true,
          productStore: {
            product: { name: true, price: true },
          },
          quantity: true,
        },
      },
    });
  }
}
