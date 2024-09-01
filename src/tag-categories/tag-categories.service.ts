import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagCategory } from './tag-category.entity';
import { Repository } from 'typeorm';
import { Tag } from 'src/tags/tag.entity';
import { UpdateTagCategoryDto } from './dto/udpate-tag.dto';
import { CreateTagCategoryDto } from './dto/create-tag.dto';

@Injectable()
export class TagCategoriesService {
  constructor(
    @InjectRepository(TagCategory)
    private tagCategoryRepository: Repository<Tag>,
  ) {}

  createTagCategory(createTagCategoryDto: CreateTagCategoryDto) {
    const newTagCategory =
      this.tagCategoryRepository.create(createTagCategoryDto);
    return this.tagCategoryRepository.save(newTagCategory);
  }

  findAllTagCategory() {
    return this.tagCategoryRepository.find();
  }

  async deleteTagCategory(id: string) {
    const tagCategory = await this.tagCategoryRepository.findOneBy({ id });
    return this.tagCategoryRepository.remove(tagCategory);
  }

  async updateTagCategory(updateTagCategoryDto: UpdateTagCategoryDto) {
    const { id, ...tagCategory } = updateTagCategoryDto;
    await this.tagCategoryRepository.update({ id }, tagCategory);
    return this.tagCategoryRepository.findOneBy({ id });
  }
}
