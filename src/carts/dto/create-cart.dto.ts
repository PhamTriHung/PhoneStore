import { PartialType } from '@nestjs/swagger';
import { Cart } from '../cart.entity';
import { IsUUID } from 'class-validator';

export class CreateCartDto {
  @IsUUID('4') userId: string;
}
