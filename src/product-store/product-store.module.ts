import { Module } from '@nestjs/common';
import { ProductStoreController } from './product-store.controller';
import { ProductStoreService } from './product-store.service';

@Module({
  controllers: [ProductStoreController],
  providers: [ProductStoreService]
})
export class ProductStoreModule {}
