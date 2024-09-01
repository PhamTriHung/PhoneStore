import { PartialType } from '@nestjs/mapped-types';
import { Coupon } from '../coupon.entity';

export class CreateCouponDto extends PartialType(Coupon) {}
