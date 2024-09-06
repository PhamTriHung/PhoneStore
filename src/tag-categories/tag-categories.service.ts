import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagCategory } from './tag-category.entity';
import { Repository } from 'typeorm';
import { UpdateTagCategoryDto } from './dto/request/udpate-tag.dto';
import { CreateTagCategoryDto } from './dto/request/create-tag-category.dto';
import { Category } from 'src/categories/category.entity';
import { CategoryTagCategory } from './category-tag-category.entity';

@Injectable()
export class TagCategoriesService {
  constructor(
    @InjectRepository(TagCategory)
    private tagCategoryRepository: Repository<TagCategory>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @InjectRepository(CategoryTagCategory)
    private categoryTagCategoriesRepository: Repository<CategoryTagCategory>,
  ) {}

  async createTagCategory(createTagCategoryDto: CreateTagCategoryDto) {
    const { categoryId, ...tagCategory } = createTagCategoryDto;

    const newTagCategory = this.tagCategoryRepository.create(tagCategory);

    if (categoryId) {
      const category = await this.categoriesRepository.findOneBy({
        id: categoryId,
      });

      if (!category) {
        throw new NotFoundException(`Category with id ${categoryId} not found`);
      } else {
        newTagCategory.categoryTagCategories = [
          this.categoryTagCategoriesRepository.create({ category }),
        ];
      }
    }

    return this.tagCategoryRepository.save(newTagCategory);
  }

  findAllTagCategory() {
    return this.tagCategoryRepository.find();
  }

  async deleteTagCategory(id: string) {
    const tagCategory = await this.tagCategoryRepository.findOneBy({ id });

    if (!tagCategory) {
      throw new NotFoundException(`Tag category with id ${id} not found`);
    } else {
      return this.tagCategoryRepository.remove(tagCategory);
    }
  }

  async updateTagCategory(
    id: string,
    updateTagCategoryDto: UpdateTagCategoryDto,
  ) {
    const { categoryId, ...updateField } = updateTagCategoryDto;

    const tagCategory = this.tagCategoryRepository.create(updateField);

    // if (categoryId) {
    //   const category = await this.categoriesRepository.findOneBy({
    //     id: categoryId,
    //   });

    //   if (!category) {
    //     throw new NotFoundException(`Category with id ${categoryId} not found`);
    //   } else {
    //     const categoryTagCategory =
    //       await this.categoryTagCategoriesRepository.findOneBy({ category });

    //     console.log(categoryTagCategory);

    //     tagCategory.categoryTagCategories = [categoryTagCategory];
    //   }
    // }

    await this.tagCategoryRepository.update({ id }, tagCategory);

    return this.tagCategoryRepository.findOneBy({ id });
  }
}
