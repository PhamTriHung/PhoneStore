import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, UpdateResult } from 'typeorm';
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
    return this.categoryRepository.find({
      relations: { childCategories: true },
    });
  }

  async findByBrandId(brandId: string): Promise<Category[]> {
    const brand = await this.brandRepository.findOne({
      where: {
        id: brandId,
      },
    });

    if (!brand) {
      throw new NotFoundException(`Brand with id ${brandId} not found`);
    } else {
      return this.categoryRepository.find({ where: { brands: brand } });
    }
  }

  findOneById(id: string): Promise<Category> {
    const category = this.categoryRepository.findOne({
      where: {
        id,
      },
    });

    if (!category) {
      throw new NotFoundException(`Category with Id ${id} not found`);
    } else {
      return category;
    }
  }

  // hes loo
  // holaaaaaaaaaaaa

  async deleteById(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: {
        id,
      },
    });

    if (!category) {
      throw new NotFoundException(`Category with Id ${id} not found`);
    } else {
      return this.categoryRepository.remove(category);
    }
  }

  async deleteManyByIds(ids: string[]): Promise<Category[]> {
    const categories = await this.categoryRepository.find({
      where: {
        id: In(ids),
      },
    });

    if (categories.length !== ids.length) {
      throw new NotFoundException(`Some id in list ${ids} not found`);
    } else {
      return this.categoryRepository.remove(categories);
    }
  }

  updateById(updateCategoryDto: UpdateCategoryDto): Promise<UpdateResult> {
    const { id, value } = updateCategoryDto;
    return this.categoryRepository.update({ id }, { value });
  }
}
