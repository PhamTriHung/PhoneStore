import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { District } from './district.entity';
import { City } from './city.entity';
import { Ward } from './ward.entity';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { CreateWardDto } from './dto/create-ward.dto';
import { UpdateWardDto } from './dto/update-ward.dto';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(City) private cityRepository: Repository<City>,
    @InjectRepository(District)
    private districtRepository: Repository<District>,
    @InjectRepository(Ward) private wardRepository: Repository<Ward>,
  ) {}

  createCity(createCityDto: CreateCityDto) {
    const newCity = this.cityRepository.create(createCityDto);
    return this.cityRepository.save(newCity);
  }

  findAllCity() {
    return this.cityRepository.find();
  }

  findCityById(id: string) {
    return this.cityRepository.findOneBy({ id });
  }

  updateCityById(id: string, updateCityDto: UpdateCityDto) {
    return this.cityRepository.update({ id }, updateCityDto);
  }

  async deleteCityById(id: string) {
    const city = await this.cityRepository.findOneBy({ id });
    return this.cityRepository.remove(city);
  }

  createDistrict(createDistrictDto: CreateDistrictDto) {
    const newDistrict = this.districtRepository.create(createDistrictDto);
    return this.districtRepository.save(newDistrict);
  }

  findAllDistrict() {
    return this.districtRepository.find();
  }

  async findDistrictById(id: string) {
    const district = await this.districtRepository.findOneBy({ id });

    if (!district) {
      throw new NotFoundException(`District with id ${id} not found`);
    } else {
      return district;
    }
  }

  async deleteDistrictById(id: string) {
    const district = await this.districtRepository.findOneBy({ id });

    if (!district) {
      throw new NotFoundException(`District with id ${id} not found`);
    } else {
      return this.districtRepository.remove(district);
    }
  }

  updateDistrictById(id: string, updateDistrictDto: UpdateDistrictDto) {
    this.districtRepository.update({ id }, updateDistrictDto);
  }

  createWard(createWardDto: CreateWardDto) {
    const newWard = this.wardRepository.create(createWardDto);
    return this.wardRepository.save(newWard);
  }

  listAllWard() {
    return this.wardRepository.find();
  }

  async findWardById(id: string) {
    const ward = await this.wardRepository.findOneBy({ id });

    if (!ward) {
      throw new NotFoundException(`Ward with id ${id} not found`);
    } else {
      return ward;
    }
  }

  async deleteWardById(id: string) {
    const ward = await this.wardRepository.findOneBy({ id });

    if (!ward) {
      throw new NotFoundException(`Ward with id ${id} not found`);
    } else {
      return this.wardRepository.remove(ward);
    }
  }

  updateWardById(id: string, updateWardDto: UpdateWardDto) {
    return this.wardRepository.update({ id }, updateWardDto);
  }
}
