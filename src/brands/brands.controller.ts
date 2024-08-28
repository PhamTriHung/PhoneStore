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
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './brand.entity';
import { DeleteManyBrandDto } from './dto/delete-many-brand.dto';

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
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(ValidationPipe) updateBrandDto: UpdateBrandDto,
  ): Promise<Brand> {
    updateBrandDto.id = id;
    return this.brandService.update(updateBrandDto);
  }

  @Delete(':id')
  deleteById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Brand> {
    return this.brandService.deleteById(id);
  }

  @Delete()
  deleteManyByIds(
    @Body(ValidationPipe) deleteManyBrandDto: DeleteManyBrandDto,
  ): Promise<Brand[]> {
    return this.brandService.deleteManyByIds(deleteManyBrandDto.ids);
  }
}
