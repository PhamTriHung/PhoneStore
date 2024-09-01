import { IsUUID } from 'class-validator';

export class FindCouponDto {
  @IsUUID('4')
  productId: string;
}
