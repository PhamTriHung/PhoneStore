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
import { CreateCouponDto } from './dto/create-coupon.dto';
import { CouponsService } from './coupons.service';
import { FindCouponDto } from './dto/find-coupon-dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('coupons')
@Controller('coupons')
export class CouponsController {
  constructor(private couponsService: CouponsService) {}

  @Post()
  createCoupon(createCouponDto: CreateCouponDto) {
    return this.couponsService.createCoupon(createCouponDto);
  }

  @Get()
  findCoupon(@Query() findCouponDto: FindCouponDto) {
    return this.couponsService.findCoupon(findCouponDto);
  }

  @Delete(':id')
  deleteCoupon(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.deleteCoupon(id);
  }

  @Patch(':id')
  updateCoupon(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(ValidationPipe) updateCouponDto: UpdateCouponDto,
  ) {
    return this.couponsService.updateCoupon(id, updateCouponDto);
  }
}
