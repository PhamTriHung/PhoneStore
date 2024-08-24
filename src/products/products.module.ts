import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { Brand } from 'src/brands/brand.entity';
import { ProductType } from 'src/product-type/product-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Brand, ProductType])],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
