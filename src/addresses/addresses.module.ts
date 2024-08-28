import { Module } from '@nestjs/common';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './address.entity';
import { City } from './city.entity';
import { District } from './district.entity';
import { Ward } from './ward.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address, City, District, Ward])],
  controllers: [AddressesController],
  providers: [AddressesService],
})
export class AddressesModule {}
