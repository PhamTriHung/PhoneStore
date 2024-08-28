import { CreateBrandDto } from './dto/create-brand.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { Brand } from './brand.entity';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Category } from 'src/categories/category.entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
    @InjectRepository(Category)
    private categoryTypeRepository: Repository<Category>,
  ) {}

  create(createBrandDto: CreateBrandDto): Promise<Brand> {
    const branch = this.brandRepository.create(createBrandDto);
    return this.brandRepository.save(branch);
  }

  find(): Promise<Brand[]> {
    return this.brandRepository.find();
  }

  async update(updateBrandDto: UpdateBrandDto): Promise<Brand> {
    const { id, productTypeIds, ...brand } = updateBrandDto;

    if (productTypeIds && productTypeIds.length > 0) {
      const productTypes = await this.categoryTypeRepository.find({
        where: { id: In(productTypeIds) },
      });

      brand.productTypes = productTypes;
    }

    this.brandRepository.update({ id }, brand);
    return this.brandRepository.findOne({ where: { id } });
  }

  async deleteById(id: string): Promise<Brand> {
    const brand = await this.brandRepository.findOne({ where: { id } });
    if (!brand) {
      throw new NotFoundException(`Brand with id ${id} not found`);
    } else {
      return this.brandRepository.remove(brand);
    }
  }

  async deleteManyByIds(ids: string[]): Promise<Brand[]> {
    const brands = await this.brandRepository.find({ where: { id: In(ids) } });
    if (brands.length !== ids.length) {
      throw new NotFoundException(`Some id in this list ${ids} is not exist`);
    } else {
      return this.brandRepository.remove(brands);
    }
  }
}
