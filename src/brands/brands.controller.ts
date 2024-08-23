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

@Controller('brands')
export class BrandsController {
  constructor(private brandService: BrandsService) {}

  @Post()
  create(@Body(ValidationPipe) createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
  }

  @Get()
  find() {
    return this.brandService.find();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateBrandDto: UpdateBrandDto,
  ) {
    updateBrandDto.id = id;
    return this.brandService.update(updateBrandDto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.brandService.deleteById(id);
  }

  @Delete()
  deleteManyByIds(@Body('ids') ids: string[]) {
    this.brandService.deleteManyByIds(ids);
  }
}
