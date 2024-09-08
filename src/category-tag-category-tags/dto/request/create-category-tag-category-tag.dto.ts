import { IsUUID } from 'class-validator';

export class CreateCategoryTagCategoryTagDto {
  @IsUUID('4')
  categoryTagCategoryId: string;

  @IsUUID('4')
  tagId: string;
}
