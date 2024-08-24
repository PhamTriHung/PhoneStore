import { Module } from '@nestjs/common';
import { ProductStoreController } from './product-store.controller';
import { ProductStoreService } from './product-store.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductStore } from './product-store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductStore])],
  controllers: [ProductStoreController],
  providers: [ProductStoreService],
})
export class ProductStoreModule {}
