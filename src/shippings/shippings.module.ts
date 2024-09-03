import { Module } from '@nestjs/common';
import { ShippingsController } from './shippings.controller';
import { ShippingsService } from './shippings.service';

@Module({
  controllers: [ShippingsController],
  providers: [ShippingsService]
})
export class ShippingsModule {}
