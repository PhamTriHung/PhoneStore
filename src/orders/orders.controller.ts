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
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/make-order.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Post()
  makeOrder(@Body(ValidationPipe) createOrderDto: CreateOrderDto) {
    this.orderService.makeOrder(createOrderDto);
  }

  @Get('search')
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

  @Get()
  findAllOrder() {
    return this.orderService.findAllOrder();
  }

  @Delete(':id')
  deleteOrderById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.orderService.deleteOrder(id);
  }

  @Patch()
  updateOrderItemById(
    @Body(ValidationPipe) updateOrderItemDto: UpdateOrderItemDto,
  ) {
    return this.orderService.updateOrderItem(updateOrderItemDto);
  }
}
