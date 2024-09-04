import { Module } from '@nestjs/common';
import { AttributesController } from './attributes.controller';
import { AttributesService } from './attributes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attribute } from './attribute.entity';
import { AttributeValue } from './attribute-value.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attribute, AttributeValue])],
  controllers: [AttributesController],
  providers: [AttributesService],
})
export class AttributesModule {}
