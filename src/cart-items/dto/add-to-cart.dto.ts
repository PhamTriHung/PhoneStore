import { PartialType } from '@nestjs/swagger';
import { IsInt, IsUUID, Min } from 'class-validator';
import { CartItem } from '../cart-item.entity';

export class AddToCartDto {
  @IsInt()
  @Min(1)
  quantity: number;
}
