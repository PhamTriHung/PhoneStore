import { Delete, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/request/create-category.dto';
import { UpdateCategoryDto } from './dto/request/update-product-type.dto';
import { TagCategoryDto } from 'src/tag-categories/dto/response/tag-category.dto';
import { CategoryDto } from './dto/response/category.dto';
import { log } from 'console';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { parentCategoryId, childCategoryIds, ...category } =
      createCategoryDto;

    const newCategory = this.categoryRepository.create(category);

    if (parentCategoryId) {
      const parentCategory = await this.categoryRepository.findOneBy({
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
      const childCategories = await this.categoryRepository.findBy({
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

    return this.categoryRepository.save(newCategory);
  }

  async find(): Promise<Category[]> {
    const categories = await this.categoryRepository.find({
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

  async findOneBySlug(slug: string) {
    const category = await this.categoryRepository.findOne({
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

    console.log(category);

    if (!category) {
      throw new NotFoundException(`Category with slud ${slug} not found`);
    } else {
      return category;
    }
  }

  async findOneById(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({
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

    console.log(category);

    if (!category) {
      throw new NotFoundException(`Category with Id ${id} not found`);
    } else {
      return category;

      // return this.mapCategoryToCategoryDto(category);
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
      const foundIds = categories.map((attr) => attr.id);
      const notFoundIds = ids.filter((id) => !foundIds.includes(id));

      throw new NotFoundException(
        `Category not found for IDs: ${notFoundIds.join(', ')}`,
      );
    } else {
      return this.categoryRepository.remove(categories);
    }
  }

  async updateById(id: string, updateCategoryDto: UpdateCategoryDto) {
    const { parentCategoryId, childCategoryIds, ...updateField } =
      updateCategoryDto;

    const category = this.categoryRepository.create(updateCategoryDto);

    if (parentCategoryId) {
      const parentCategory = await this.categoryRepository.findOneBy({
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
      const childCategories = await this.categoryRepository.findBy({
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

    await this.categoryRepository.update(id, category);

    return this.categoryRepository.findOneBy({ id });
  }
}
