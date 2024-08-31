import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { Brand } from 'src/brands/brand.entity';
import { Category } from 'src/categories/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Brand, Category])],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
