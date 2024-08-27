import { MakeOrderDto } from './dto/make-order.dto';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Post()
  makeOrder(@Body(ValidationPipe) makeOrderDtos: MakeOrderDto[]) {
    this.orderService.makeOrder(makeOrderDtos);
  }
}
