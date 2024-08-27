import { MakeOrderDto } from './dto/make-order.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Post()
  makeOrder(@Body(ValidationPipe) makeOrderDtos: MakeOrderDto[]) {
    this.orderService.makeOrder(makeOrderDtos);
  }

  @Get()
  listAllOrderByUserId(
    @Query('userId', new ParseUUIDPipe({ version: '4' })) userId: string,
  ) {
    return this.orderService.findOrderByUser(userId);
  }

  @Get(':id')
  findOrderByOrderId(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.orderService.findOrderByOrderId(id);
  }

  @Delete(':id')
  deleteOrderById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.deleteOrderById(id);
  }
}
