import { IsUUID } from 'class-validator';

export class AddTagCategoryToCategoryDto {
  @IsUUID('4')
  categoryId: string;

  @IsUUID('4')
  tagCategoryId: string;
}
