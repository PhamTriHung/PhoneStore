import { IsUUID } from 'class-validator';

export class AddTagToTagCategoryDto {
  @IsUUID('4')
  tagId: string;

  @IsUUID('4')
  categoryTagCategoryId: string;
}
