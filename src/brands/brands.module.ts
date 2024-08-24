import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './brand.entity';
import { ProductType } from 'src/product-type/product-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Brand, ProductType])],
  providers: [BrandsService],
  controllers: [BrandsController],
})
export class BrandsModule {}
