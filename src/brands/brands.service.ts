import { CreateBrandDto } from './dto/create-brand.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Brand } from './brand.entity';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
  ) {}

  create(createBrandDto: CreateBrandDto): Promise<Brand> {
    const newBrand = this.brandRepository.create(createBrandDto);
    return this.brandRepository.save(newBrand);
  }

  find() {
    return this.brandRepository.find();
  }

  update(updateBrandDto: UpdateBrandDto) {
    const { id, ...updateField } = updateBrandDto;
    return this.brandRepository.update({ id }, { ...updateField });
  }

  deleteById(id: string) {
    return this.brandRepository.delete(id);
  }

  deleteManyByIds(ids: string[]) {
    return this.brandRepository.delete({ id: In(ids) });
  }
}
