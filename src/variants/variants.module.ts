import { Module } from '@nestjs/common';
import { VariantsController } from './variants.controller';
import { VariantsService } from './variants.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Variant } from './variant.entity';
import { Product } from 'src/products/products.entity';
import { AttributeValue } from 'src/attributes/attribute-value.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Variant, Product, AttributeValue])],
  controllers: [VariantsController],
  providers: [VariantsService],
})
export class VariantsModule {}
