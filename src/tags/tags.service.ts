import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { CreateTagDto } from './dto/request/create-tag.dto';
import { TagCategory } from 'src/tag-categories/tag-category.entity';
import { FilterTagDto } from './dto/request/filter-tag.dto';
import { UpdateTagDto } from './dto/request/update-tag.dto';
import { DeleteManyTagDto } from './dto/request/delete-many-tag.dto';
import { DuplicateNameException } from 'src/exceptions/duplicate-name.exception';
import { CategoryTagCategory } from 'src/tag-categories/category-tag-category.entity';
import { Category } from 'src/categories/category.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag) private tagRepository: Repository<Tag>,
    @InjectRepository(TagCategory)
    private tagCategoryRepository: Repository<TagCategory>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(CategoryTagCategory)
    private categoryTagCategoryRepository: Repository<CategoryTagCategory>,
  ) {}

  async createTag(createTagDto: CreateTagDto) {
    const { name, categoryId, tagCategoryId } = createTagDto;

    const oldTag = await this.tagRepository.findOneBy({ name });

    if (oldTag) {
      throw new DuplicateNameException(name);
    } else {
      const newTag = this.tagRepository.create({ name });

      if (categoryId && tagCategoryId) {
        const categoryTagCategory =
          await this.categoryTagCategoryRepository.create({
            category: await this.categoryRepository.findOneBy({
              id: categoryId,
            }),
            tagCategory: await this.tagCategoryRepository.findOneBy({
              id: tagCategoryId,
            }),
          });

        if (!categoryTagCategory) {
          throw new NotFoundException(
            `Tag category with id ${categoryTagCategory} not found`,
          );
        } else {
          newTag.categoryTagCategories = [categoryTagCategory];
        }
      }

      return this.tagRepository.save(newTag);
    }
  }

  filterTag(filterTagDto: FilterTagDto) {
    const findTagOptionsWhere: FindOptionsWhere<Tag> = {};

    if (filterTagDto.categoryId) {
      findTagOptionsWhere.categoryTagCategories =
        this.categoryTagCategoryRepository.create({
          category: this.categoryRepository.create({
            id: filterTagDto.categoryId,
          }),
        });
    }

    return Object.keys(findTagOptionsWhere).length === 0
      ? this.tagRepository.find()
      : this.tagRepository.findBy(findTagOptionsWhere);
  }

  async deleteTag(id: string) {
    const tag = await this.tagRepository.findOneBy({ id });

    if (!tag) {
      throw new NotFoundException(`Tag with id ${id} not found`);
    } else {
      return this.tagRepository.remove(tag);
    }
  }

  async deleteManyTag({ ids }: DeleteManyTagDto) {
    const tags = await this.tagRepository.findBy({ id: In(ids) });

    if (tags.length == 0) {
      throw new NotFoundException(``);
    } else {
      return this.tagRepository.remove(tags);
    }
  }

  async updateTag(id: string, updateTagDto: UpdateTagDto) {
    const { categoryId, tagCategoryId, ...fieldToUpdate } = updateTagDto;
    const tag = this.tagRepository.create(fieldToUpdate);

    // if (categoryId && tagCategoryId) {
    //   const categoryTagCategory =
    //     await this.categoryTagCategoryRepository.findOne({
    //       where: {
    //         category: await this.categoryRepository.findOneBy({
    //           id: categoryId,
    //         }),
    //         tagCategory: await this.tagCategoryRepository.findOneBy({
    //           id: tagCategoryId,
    //         }),
    //       },
    //       relations: {
    //         category: true,
    //         tagCategory: true,
    //       },
    //     });

    //   if (!categoryTagCategory) {
    //     throw new NotFoundException(
    //       `Tag category with category id ${categoryId} and tag category ${tagCategoryId} not found`,
    //     );
    //   } else {
    //     tag.categoryTagCategories = [categoryTagCategory];
    //   }
    // }

    await this.tagRepository.update({ id }, tag);

    return this.tagRepository.findOneBy({ id });
  }
}
