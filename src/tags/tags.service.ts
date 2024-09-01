import { MaxLength } from 'class-validator';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagCategory } from 'src/tag-categories/tag-category.entity';
import { FilterTagDto } from './dto/filter-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { DeleteManyTagDto } from './dto/delete-many-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag) private tagRepository: Repository<Tag>,
    @InjectRepository(TagCategory)
    private tagCategoryRepository: Repository<TagCategory>,
  ) {}

  createTag(createTagDto: CreateTagDto) {
    const { name, tagCategoryId } = createTagDto;

    const newTag = this.tagRepository.create({ name });

    if (tagCategoryId) {
      newTag.tagCategory = this.tagCategoryRepository.create({
        id: tagCategoryId,
      });
    }

    this.tagRepository.save(newTag);
  }

  filterTag(filterTaskDto: FilterTagDto) {
    const findTagOptionsWhere: FindOptionsWhere<Tag> = {};

    if (filterTaskDto.tagCategoryId) {
      findTagOptionsWhere.tagCategory = this.tagCategoryRepository.create({
        id: filterTaskDto.tagCategoryId,
      });
    }

    return Object.keys(findTagOptionsWhere).length === 0
      ? this.tagRepository.find()
      : this.tagRepository.findBy(findTagOptionsWhere);
  }

  deleteTag(id: string) {
    const tag = this.tagCategoryRepository.findOneBy({ id });

    if (!tag) {
      throw new NotFoundException(`Tag with id ${id} not found`);
    } else {
      return tag;
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

  async updateTag(updateTagDto: UpdateTagDto) {
    const { id, ...tag } = updateTagDto;
    await this.tagRepository.update({ id }, tag);

    return this.tagRepository.findOneBy({ id });
  }
}
