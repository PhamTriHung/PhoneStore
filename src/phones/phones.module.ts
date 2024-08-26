import { Module } from '@nestjs/common';
import { PhonesService } from './phones.service';
import { PhonesController } from './phones.controller';

@Module({
  providers: [PhonesService],
  controllers: [PhonesController]
})
export class PhonesModule {}
