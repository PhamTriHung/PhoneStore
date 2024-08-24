import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsUUID, Min } from 'class-validator';
import { Cart } from 'src/users/cart.entity';

export class AddToCartDto extends PartialType(Cart) {
  @IsUUID(4)
  userId: string;

  @IsUUID(4)
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}
