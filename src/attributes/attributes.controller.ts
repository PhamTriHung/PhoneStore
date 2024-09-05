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
import { AttributesService } from './attributes.service';
import { CreateAttributeValueDto } from './dto/create-attribute-value.dto';
import { UpdateAttributeValueDto } from './dto/update-attribute-value.dto';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('attributes')
@Controller('attributes')
export class AttributesController {
  constructor(private attributesService: AttributesService) {}

  @Post('values')
  createAttributeValue(
    @Body(ValidationPipe) createAttributeValueDto: CreateAttributeValueDto,
  ) {
    return this.attributesService.createAttributeValue(createAttributeValueDto);
  }

  @Get('values')
  findAllAttributeValue() {
    return this.attributesService.findAllAttributeValue();
  }

  @Get('values/:id')
  findAttributeValueById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.attributesService.findAttributeValueById(id);
  }

  @Delete('values/:id')
  deleteAttributeValueById(
    @Param(':id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.attributesService.deleteAttributeValueById(id);
  }

  @Patch('values/:id')
  updateAttributeValueById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(ValidationPipe) updateAttributeValueDto: UpdateAttributeValueDto,
  ) {
    return this.attributesService.updateAttributeValueById(
      id,
      updateAttributeValueDto,
    );
  }

  @Post()
  createAttribute(
    @Body(ValidationPipe) createAttributeDto: CreateAttributeDto,
  ) {
    return this.attributesService.createAttribute(createAttributeDto);
  }

  @Get()
  findAllAttribute() {
    return this.attributesService.findAllAttribute();
  }

  @Get(':id')
  findAttributeById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.attributesService.findAttributeById(id);
  }

  @Delete(':id')
  deleteAttributeById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.attributesService.deleteAttributeById(id);
  }

  @Patch(':id')
  updateAttributeById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(ValidationPipe) updateAttributeDto: UpdateAttributeDto,
  ) {
    return this.attributesService.updateAttributeById(id, updateAttributeDto);
  }
}
