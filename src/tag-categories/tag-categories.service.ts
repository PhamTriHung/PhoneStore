import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagCategory } from './tag-category.entity';
import { Repository } from 'typeorm';
import { UpdateTagCategoryDto } from './dto/request/update-tag-category.dto';
import { CreateTagCategoryDto } from './dto/request/create-tag-category.dto';
import { Category } from 'src/categories/category.entity';
import { CategoryTagCategory } from '../category-tag-categories/category-tag-category.entity';
import { isDuplicate } from 'src/utils/database-utils';

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

  async createTagCategory(
    createTagCategoryDto: CreateTagCategoryDto,
  ): Promise<TagCategory> {
    const { categoryId, ...otherTagCategoryField } = createTagCategoryDto;

    if (
      isDuplicate(
        this.tagCategoryRepository,
        'name',
        otherTagCategoryField.name,
      )
    )
      throw new BadRequestException(
        `Tag category name ${otherTagCategoryField.name} dupplicated`,
      );

    const newTagCategory = this.tagCategoryRepository.create(
      otherTagCategoryField,
    );

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

  findAllTagCategory(): Promise<TagCategory[]> {
    return this.tagCategoryRepository.find();
  }

  async deleteTagCategory(id: string): Promise<TagCategory> {
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
    const { ...updateField } = updateTagCategoryDto;

    if (updateField.name) {
      if (isDuplicate(this.tagCategoryRepository, 'name', updateField.name))
        throw new BadRequestException(
          `Tag category name ${updateField.name} dupplicated`,
        );
    }

    const tagCategory = this.tagCategoryRepository.create(updateField);

    await this.tagCategoryRepository.update({ id }, tagCategory);

    return this.tagCategoryRepository.findOneBy({ id });
  }
}
