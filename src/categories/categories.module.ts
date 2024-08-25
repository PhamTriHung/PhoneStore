import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Category } from './category.entity';
import { Brand } from 'src/brands/brand.entity';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Brand])],
  providers: [CategoriesService],
  controllers: [CategoriesController],
})
export class ProductTypeModule {}
