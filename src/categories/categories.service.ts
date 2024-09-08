import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/request/create-category.dto';
import { UpdateCategoryDto } from './dto/request/update-product-type.dto';
import { isDuplicate } from 'src/utils/database-utils';
import { TagCategory } from 'src/tag-categories/tag-category.entity';
import { CategoryTagCategory } from 'src/category-tag-categories/category-tag-category.entity';
import { AddTagCategoryToCategoryDto } from './dto/request/add-tag-category-to-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @InjectRepository(TagCategory)
    private tagCategoriesRepository: Repository<TagCategory>,
    @InjectRepository(CategoryTagCategory)
    private categoryTagCategoriesRepository: Repository<CategoryTagCategory>,
  ) {}

  // #region category
  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const { parentCategoryId, childCategoryIds, ...otherCategoryField } =
      createCategoryDto;

    if (isDuplicate(this.categoriesRepository, 'name', otherCategoryField.name))
      throw new BadRequestException(
        `Category name ${otherCategoryField.name} dupplicated`,
      );

    const newCategory = this.categoriesRepository.create(otherCategoryField);

    if (parentCategoryId) {
      const parentCategory = await this.categoriesRepository.findOneBy({
        id: parentCategoryId,
      });

      if (!parentCategory) {
        throw new NotFoundException(
          `Category with id ${parentCategory} not found`,
        );
      } else {
        newCategory.parentCategory = parentCategory;
      }
    }

    if (childCategoryIds && childCategoryIds.length > 0) {
      const childCategories = await this.categoriesRepository.findBy({
        id: In(childCategoryIds),
      });

      if (childCategoryIds.length !== childCategories.length) {
        const foundIds = childCategories.map(
          (childCategory) => childCategory.id,
        );
        const notFoundIds = childCategoryIds.filter(
          (id) => !foundIds.includes(id),
        );

        throw new NotFoundException(
          `Category not found for ids ${notFoundIds.join(', ')}`,
        );
      } else {
        newCategory.childCategories = childCategories;
      }
    }

    return this.categoriesRepository.save(newCategory);
  }

  async findAllCategory(): Promise<Category[]> {
    const categories = await this.categoriesRepository.find({
      relations: {
        childCategories: true,
        categoryTagCategories: {
          tagCategory: true,
          categoryTagCategoryTags: {
            tag: true,
          },
        },
        products: true,
      },
    });

    return categories;
  }

  async findOneCategoryBySlug(slug: string) {
    const category = await this.categoriesRepository.findOne({
      where: {
        slug,
      },
      relations: {
        childCategories: true,
        categoryTagCategories: {
          tagCategory: true,
          categoryTagCategoryTags: {
            tag: true,
          },
        },
        products: true,
      },
    });

    if (!category) {
      throw new NotFoundException(`Category with slud ${slug} not found`);
    } else {
      return category;
    }
  }

  async findOneCategoryById(id: string): Promise<Category> {
    const category = await this.categoriesRepository.findOne({
      where: {
        id,
      },
      relations: {
        childCategories: true,
        categoryTagCategories: {
          tagCategory: true,
          categoryTagCategoryTags: {
            tag: true,
          },
        },
        products: true,
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

  async deleteCategoryById(id: string): Promise<Category> {
    const category = await this.categoriesRepository.findOne({
      where: {
        id,
      },
    });

    if (!category)
      throw new NotFoundException(`Category with Id ${id} not found`);

    return this.categoriesRepository.remove(category);
  }

  async deleteMultipleCategoryByIds(ids: string[]): Promise<Category[]> {
    const categories: Category[] = await this.categoriesRepository.find({
      where: {
        id: In(ids),
      },
    });

    if (categories.length !== ids.length) {
      const foundIds: string[] = categories.map((attr) => attr.id);
      const notFoundIds: string[] = ids.filter((id) => !foundIds.includes(id));

      throw new NotFoundException(
        `Category not found for IDs: ${notFoundIds.join(', ')}`,
      );
    } else {
      return this.categoriesRepository.remove(categories);
    }
  }

  async updateCategoryById(id: string, updateCategoryDto: UpdateCategoryDto) {
    const { parentCategoryId, childCategoryIds, ...updateField } =
      updateCategoryDto;

    if (updateCategoryDto.name) {
      if (
        isDuplicate(this.categoriesRepository, 'name', updateCategoryDto.name)
      ) {
        throw new BadRequestException(
          `Category name ${updateCategoryDto.name} dupplicated`,
        );
      }
    }

    const category = this.categoriesRepository.create(updateField);

    if (parentCategoryId) {
      const parentCategory = await this.categoriesRepository.findOneBy({
        id: parentCategoryId,
      });

      if (!parentCategory) {
        throw new NotFoundException(
          `Category with id ${parentCategory} not found`,
        );
      } else {
        category.parentCategory = parentCategory;
      }
    }

    if (childCategoryIds && childCategoryIds.length > 0) {
      const childCategories = await this.categoriesRepository.findBy({
        id: In(childCategoryIds),
      });

      if (childCategoryIds.length !== childCategories.length) {
        const foundIds = childCategories.map(
          (childCategory) => childCategory.id,
        );
        const notFoundIds = childCategoryIds.filter(
          (id) => !foundIds.includes(id),
        );

        throw new NotFoundException(
          `Category not found for ids ${notFoundIds.join(', ')}`,
        );
      } else {
        category.childCategories = childCategories;
      }
    }

    await this.categoriesRepository.update(id, category);

    return this.categoriesRepository.findOneBy({ id });
  }
  //#endregion

  //#region tag category
  async addTagCategoryToCategory({
    id,
    tagCategoryId,
  }: AddTagCategoryToCategoryDto) {
    const category: Category = await this.categoriesRepository.findOne({
      where: {
        id,
      },
      relations: {
        categoryTagCategories: true,
      },
    });

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    const tagCategory = await this.tagCategoriesRepository.findOneBy({
      id: tagCategoryId,
    });

    if (!tagCategory) {
      throw new NotFoundException(
        `Tag category with id ${tagCategoryId} not found`,
      );
    }

    const newCategoryTagCategory = this.categoryTagCategoriesRepository.create({
      category,
      tagCategory,
    });

    return this.categoryTagCategoriesRepository.save(newCategoryTagCategory);
  }

  async findAllTagCategoryByCategoryId(id: string) {
    const category = await this.categoriesRepository.findOneBy({ id });

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return this.categoryTagCategoriesRepository.find({
      where: {
        category,
      },
      relations: {
        tagCategory: true,
      },
    });
  }
  //#endregion
}
