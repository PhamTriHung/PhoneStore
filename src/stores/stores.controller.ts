import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { Store } from './store.entity';
import { UpdateResult } from 'typeorm';
import { UpdateStoreDto } from './dto/update-store.dto';
import { ApiTags } from '@nestjs/swagger';
import { DeleteMultipleStoreDto } from './dto/delete-multiple-store.dto';

@ApiTags('stores')
@Controller('stores')
export class StoresController {
  constructor(private storeService: StoresService) {}

  @Post()
  createStore(
    @Body(ValidationPipe) createStoreDto: CreateStoreDto,
  ): Promise<Store> {
    return this.storeService.create(createStoreDto);
  }

  @Get()
  listAllStore(): Promise<Store[]> {
    return this.storeService.find();
  }

  @Get(':id')
  findStoreById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.storeService.findById(id);
  }

  @Patch(':id')
  updateStore(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(ValidationPipe) updateStoreDto: UpdateStoreDto,
  ): Promise<UpdateResult> {
    return this.storeService.update(id, updateStoreDto);
  }

  @Delete(':id')
  deleteStore(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.storeService.delete(id);
  }

  @Delete()
  deleteMultipleStore(
    @Body(ValidationPipe) deleteMultipleStoreDto: DeleteMultipleStoreDto,
  ) {
    return this.storeService.deleteManyStoreById(deleteMultipleStoreDto.ids);
  }
}
