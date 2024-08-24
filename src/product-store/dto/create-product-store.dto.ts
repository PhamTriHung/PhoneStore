import { PartialType } from '@nestjs/mapped-types';
import { ProductStore } from '../product-store.entity';
import { IsPositive, IsUUID } from 'class-validator';

export class CreateProductStoreDto extends PartialType(ProductStore) {
  @IsUUID(4)
  productId: string;

  @IsUUID(4)
  storeId: string;

  @IsPositive()
  quantity: number;
}
