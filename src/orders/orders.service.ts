import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderItem } from 'src/orders/order-item.entity';
import { User } from 'src/users/users.entity';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { ProductStore } from 'src/product-store/product-store.entity';
import { CreateOrderDto } from './dto/make-order.dto';

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

  async makeOrder(createOrderDto: CreateOrderDto) {
    const order = this.orderRepository.create({
      user: this.userRepository.create({
        id: createOrderDto.userId,
      }),
    });

    const orderItems = [];
    createOrderDto.orderItems.forEach(async (cartItem) => {
      const orderItem = this.orderItemRepository.create({
        quantity: cartItem.quantity,
        productStore: await this.productStoreRepository.findOneBy({
          id: cartItem.productStoreId,
        }),
      });

      orderItems.push(orderItem);
    });

    order.orderItems = orderItems;

    return this.orderRepository.save(order);
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
          orderItems: { productStore: { variant: true } },
        },
        select: {
          orderItems: {
            productStoreId: true,
            productStore: { variant: { product: { name: true, price: true } } },
            quantity: true,
          },
        },
      });
    }
  }

  async findOrderByOrderId(id: string) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: {
        orderItems: { productStore: { variant: { product: true } } },
      },
      select: {
        orderItems: {
          orderId: true,
          productStoreId: true,
          productStore: { variant: { product: { name: true, price: true } } },
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
        orderItems: { productStore: { variant: { product: true } } },
      },
      select: {
        orderItems: {
          productStoreId: true,
          productStore: {
            variant: {
              product: { name: true, price: true },
            },
          },
          quantity: true,
        },
      },
    });
  }
}
