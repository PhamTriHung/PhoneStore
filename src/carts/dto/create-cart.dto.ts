import { PartialType } from '@nestjs/mapped-types';
import { Cart } from '../cart.entity';
import { IsUUID } from 'class-validator';

export class CreateCartDto extends PartialType(Cart) {
  @IsUUID('4') userId: string;
}
