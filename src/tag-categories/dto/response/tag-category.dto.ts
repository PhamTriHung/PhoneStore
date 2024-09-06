import { TagDto } from 'src/tags/dto/response/tag.dto';

export class TagCategoryDto {
  id: string;
  name: string;
  tags: TagDto[];
}
