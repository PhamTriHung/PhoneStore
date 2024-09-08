import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryTagCategory } from 'src/category-tag-categories/category-tag-category.entity';
import { Tag } from 'src/tags/tag.entity';
import { Repository } from 'typeorm';
import { CreateCategoryTagCategoryTagDto } from './dto/request/create-category-tag-category-tag.dto';
import { CategoryTagCategoryTag } from './category-tag-category-tag.entity';

@Injectable()
export class CategoryTagCategoryTagsService {
  constructor(
    @InjectRepository(CategoryTagCategory)
    private categoryTagCategoryRepository: Repository<CategoryTagCategory>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    @InjectRepository(CategoryTagCategoryTag)
    private categoryTagCategoryTagRepository: Repository<CategoryTagCategoryTag>,
  ) {}

  async createCategoryTagCategoryTag(
    createCategoryTagCategoryTagDto: CreateCategoryTagCategoryTagDto,
  ) {
    const { categoryTagCategoryId, tagId } = createCategoryTagCategoryTagDto;
    if (!categoryTagCategoryId || !tagId)
      throw new BadRequestException(`Please provide the required information`);

    const categoryTagCategory =
      await this.categoryTagCategoryRepository.findOneBy({
        id: categoryTagCategoryId,
      });
    const tag = await this.tagRepository.findOneBy({ id: tagId });

    if (!categoryTagCategory)
      throw new NotFoundException(
        `Relation between Category and Tag Category with id ${categoryTagCategoryId} not found`,
      );
    if (!tag) throw new NotFoundException(`Tag with id ${tagId} not found`);

    const newCategoryTagCategoryTag =
      this.categoryTagCategoryTagRepository.create({
        tag,
        categoryTagCategory,
      });

    return this.categoryTagCategoryTagRepository.save(
      newCategoryTagCategoryTag,
    );
  }
}
