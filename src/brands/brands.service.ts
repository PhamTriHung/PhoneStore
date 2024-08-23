import { CreateBrandDto } from './dto/create-brand.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
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

  find(): Promise<Brand[]> {
    return this.brandRepository.find();
  }

  update(updateBrandDto: UpdateBrandDto): Promise<UpdateResult> {
    const { id, ...updateField } = updateBrandDto;

    return this.brandRepository.update({ id }, updateField);
  }

  deleteById(id: string): Promise<DeleteResult> {
    return this.brandRepository.delete(id);
  }

  deleteManyByIds(ids: string[]): Promise<DeleteResult> {
    return this.brandRepository.delete({ id: In(ids) });
  }
}
