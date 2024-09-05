import { PartialType } from '@nestjs/swagger';
import { ProductStore } from '../product-store.entity';
import { IsPositive, IsUUID } from 'class-validator';

export class CreateProductStoreDto {
  @IsUUID(4)
  storeId: string;

  @IsUUID(4)
  variantId: string;

  @IsPositive()
  quantity: number;
}
