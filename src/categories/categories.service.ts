import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { Brand } from 'src/brands/brand.entity';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-product-type.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
  ) {}

  create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const newProductType = this.categoryRepository.create(createCategoryDto);

    return this.categoryRepository.save(newProductType);
  }

  find(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findByBrandId(brandId: string): Promise<Category[]> {
    const brand = await this.brandRepository.findOne({
      where: { id: brandId },
    });

    return this.categoryRepository.find({ where: { brands: brand } });
  }

  findOneById(id: string): Promise<Category> {
    return this.categoryRepository.findOne({ where: { id } });
  }

  // hes loo
  // holaaaaaaaaaaaa

  deleteById(id: string): Promise<DeleteResult> {
    return this.categoryRepository.delete(id);
  }

  deleteManyByIds(ids: string[]): Promise<DeleteResult> {
    return this.categoryRepository.delete({ id: In(ids) });
  }

  updateById(updateCategoryDto: UpdateCategoryDto): Promise<UpdateResult> {
    const { id, value } = updateCategoryDto;
    return this.categoryRepository.update({ id }, { value });
  }
}
