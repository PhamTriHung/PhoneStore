import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductTypesService } from './product-types.service';
import { ProductTypesController } from './product-types.controller';
import { ProductType } from './product-type.entity';
import { Brand } from 'src/brands/brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductType, Brand])],
  providers: [ProductTypesService],
  controllers: [ProductTypesController],
})
export class ProductTypeModule {}
