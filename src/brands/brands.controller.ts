import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './brand.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('brands')
export class BrandsController {
  constructor(private brandService: BrandsService) {}

  @Post()
  create(@Body(ValidationPipe) createBrandDto: CreateBrandDto): Promise<Brand> {
    return this.brandService.create(createBrandDto);
  }

  @Get()
  find(): Promise<Brand[]> {
    return this.brandService.find();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateBrandDto: UpdateBrandDto,
  ): Promise<UpdateResult> {
    updateBrandDto.id = id;
    return this.brandService.update(updateBrandDto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string): Promise<DeleteResult> {
    return this.brandService.deleteById(id);
  }

  @Delete()
  deleteManyByIds(@Body('ids') ids: string[]): Promise<DeleteResult> {
    return this.brandService.deleteManyByIds(ids);
  }
}
