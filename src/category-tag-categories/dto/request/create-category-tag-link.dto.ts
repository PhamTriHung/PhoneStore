import { IsUUID } from 'class-validator';

export class CreateCategoryTagLinkDto {
  @IsUUID('4')
  categoryId: string;

  @IsUUID('4')
  tagCategoryId: string;
}
