import { IsUUID } from 'class-validator';

export class AddTagCategoryToCategoryDto {
  @IsUUID('4')
  id: string;

  @IsUUID('4')
  tagCategoryId: string;
}
