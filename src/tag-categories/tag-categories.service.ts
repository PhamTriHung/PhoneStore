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
import { findEntityById, isDuplicate } from 'src/utils/database-utils';
import { AddTagToTagCategoryDto } from './dto/request/add-tag-to-tag-category.dto';
import { CategoryTagCategoryTag } from 'src/category-tag-category-tags/category-tag-category-tag.entity';
import { Tag } from 'src/tags/tag.entity';
import { DeleteTagFromTagCategoryDto } from './dto/request/delete-tag-from-tag-category.dto';

@Injectable()
export class TagCategoriesService {
  constructor(
    @InjectRepository(TagCategory)
    private tagCategoryRepository: Repository<TagCategory>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @InjectRepository(CategoryTagCategory)
    private categoryTagCategoriesRepository: Repository<CategoryTagCategory>,
    @InjectRepository(CategoryTagCategoryTag)
    private categoryTagCategoryTagsRepository: Repository<CategoryTagCategoryTag>,
    @InjectRepository(Tag) private tagsRepository: Repository<Tag>,
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

  async addTagToTagCategory({
    tagId,
    categoryTagCategoryId,
  }: AddTagToTagCategoryDto) {
    const tag = await findEntityById(this.tagsRepository, tagId);

    const categoryTagCategory = await findEntityById(
      this.categoryTagCategoriesRepository,
      categoryTagCategoryId,
    );

    const newCategoryTagCategoryTag =
      this.categoryTagCategoryTagsRepository.create({
        tag,
        categoryTagCategory,
      });

    return this.categoryTagCategoryTagsRepository.save(
      newCategoryTagCategoryTag,
    );
  }

  async deleteTagFromTagCategory({
    tagId,
    categoryTagCategoryId,
  }: DeleteTagFromTagCategoryDto) {
    const tag = await findEntityById(this.tagsRepository, tagId);

    const categoryTagCategory = await findEntityById(
      this.categoryTagCategoriesRepository,
      categoryTagCategoryId,
    );

    try {
      const categoryTagCategoryTag =
        await this.categoryTagCategoryTagsRepository.findOneByOrFail({
          tag,
          categoryTagCategory,
        });

      return this.categoryTagCategoryTagsRepository.remove(
        categoryTagCategoryTag,
      );
    } catch (error) {
      throw new NotFoundException(
        `The relation between tag with id ${tagId} tag category id ${categoryTagCategoryId} not found`,
      );
    }
  }

  async findAllTagFromTagCategory(id: string) {
    const categoryTagCategory = await findEntityById(
      this.categoryTagCategoriesRepository,
      id,
    );

    return this.categoryTagCategoryTagsRepository.findBy({
      categoryTagCategory,
    });
  }
}
