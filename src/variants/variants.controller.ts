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
import { VariantsService } from './variants.service';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';

@Controller('variants')
export class VariantsController {
  constructor(private variantsService: VariantsService) {}

  @Post()
  createVariant(@Body(ValidationPipe) createVariantDto: CreateVariantDto) {
    return this.variantsService.createVariant(createVariantDto);
  }

  @Get()
  findAllVariant() {
    return this.variantsService.findAllVariant();
  }

  @Patch(':id')
  updateVariant(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(ValidationPipe) updateVariantDto: UpdateVariantDto,
  ) {
    return this.variantsService.updateVariantById(id, updateVariantDto);
  }

  @Delete(':id')
  deleteVariant(@Param(':id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.variantsService.deleteVariantById(id);
  }
}
