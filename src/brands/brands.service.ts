import { CreateBrandDto } from './dto/create-brand.dto';
import { Injectable } from '@nestjs/common';
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
    const newBrand = this.brandRepository.create(createBrandDto);
    return this.brandRepository.save(newBrand);
  }

  find(): Promise<Brand[]> {
    return this.brandRepository.find();
  }

  async update(updateBrandDto: UpdateBrandDto): Promise<UpdateResult> {
    const { id, productTypeIds, ...brand } = updateBrandDto;

    if (productTypeIds && productTypeIds.length > 0) {
      const productTypes = await this.categoryTypeRepository.find({
        where: { id: In(productTypeIds) },
      });

      brand.productTypes = productTypes;
    }

    return this.brandRepository.update({ id }, brand);
  }

  deleteById(id: string): Promise<DeleteResult> {
    return this.brandRepository.delete(id);
  }

  deleteManyByIds(ids: string[]): Promise<DeleteResult> {
    return this.brandRepository.delete({ id: In(ids) });
  }
}
