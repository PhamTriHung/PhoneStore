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
import { CreateCityDto } from './dto/create-city.dto';
import { AddressesService } from './addresses.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { CreateWardDto } from './dto/create-ward.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { UpdateWardDto } from './dto/update-ward.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('addressess')
@Controller('addresses')
export class AddressesController {
  constructor(private addressesService: AddressesService) {}
  @Post('city')
  createCity(@Body(ValidationPipe) createCityDto: CreateCityDto) {
    return this.addressesService.createCity(createCityDto);
  }

  @Post('district')
  createDistrict(@Body() createDistrictDto: CreateDistrictDto) {
    return this.addressesService.createDistrict(createDistrictDto);
  }

  @Post('ward')
  createWard(@Body(ValidationPipe) createWardDto: CreateWardDto) {
    return this.addressesService.createWard(createWardDto);
  }

  @Get('city')
  findAllCity() {
    return this.addressesService.findAllCity();
  }

  @Get('district')
  findAllDistrict() {
    return this.addressesService.findAllDistrict();
  }

  @Get('ward')
  findAllWard() {
    return this.addressesService.listAllWard();
  }

  @Get('city/:id')
  findCityById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.addressesService.findCityById(id);
  }

  @Get('district/:id')
  findDistrictById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.addressesService.findDistrictById(id);
  }

  @Get('ward/:id')
  findWardById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.addressesService.findWardById(id);
  }

  @Delete('city/:id')
  deleteCityById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.addressesService.deleteCityById(id);
  }

  @Delete('district/:id')
  deleteDistrictById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.addressesService.deleteDistrictById(id);
  }

  @Delete('ward/:id')
  deleteWardById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.addressesService.deleteCityById(id);
  }

  @Patch('city/:id')
  updateCityById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(ValidationPipe)
    updateCityDto: UpdateCityDto,
  ) {
    return this.addressesService.updateCityById(id, updateCityDto);
  }

  @Patch('district/:id')
  updateDistrictById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(ValidationPipe)
    updateDistrictDto: UpdateDistrictDto,
  ) {
    return this.addressesService.updateDistrictById(id, updateDistrictDto);
  }

  @Patch('ward/:id')
  updateWardById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(ValidationPipe)
    updateWardDto: UpdateWardDto,
  ) {
    return this.addressesService.updateWardById(id, updateWardDto);
  }
}
