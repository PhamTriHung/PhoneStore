import { CreateCategoryTagLinkDto } from './dto/request/create-category-tag-link.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryTagCategory } from './category-tag-category.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/category.entity';
import { TagCategory } from 'src/tag-categories/tag-category.entity';
import { Tag } from 'src/tags/tag.entity';

@Injectable()
export class CategoryTagCategoriesService {
  constructor(
    @InjectRepository(CategoryTagCategory)
    private categoryTagCategoriesRepository: Repository<CategoryTagCategory>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @InjectRepository(TagCategory)
    private tagCategoriesRepository: Repository<TagCategory>,
    @InjectRepository(Tag) private tagsRepository: Repository<Tag>,
  ) {}

  async createCategoryTagLink(
    createCategoryTagLinkDto: CreateCategoryTagLinkDto,
  ) {
    const { categoryId, tagCategoryId } = createCategoryTagLinkDto;

    const category = await this.categoriesRepository.findOneBy({
      id: categoryId,
    });

    const tagCategory = await this.tagCategoriesRepository.findOneBy({
      id: tagCategoryId,
    });

    if (!category)
      throw new NotFoundException(`Category with id ${categoryId} not found`);

    if (!tagCategory)
      throw new NotFoundException(
        `Tag Category with id ${categoryId} not found`,
      );

    const newCategoryTagCategory = this.categoryTagCategoriesRepository.create({
      category,
      tagCategory,
    });

    return this.categoryTagCategoriesRepository.save(newCategoryTagCategory);
  }
}
