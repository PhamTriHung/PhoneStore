import { Module } from '@nestjs/common';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './store.entity';
import { Ward } from 'src/addresses/ward.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Store, Ward])],
  controllers: [StoresController],
  providers: [StoresService],
})
export class StoresModule {}
