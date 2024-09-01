import { IsUUID } from 'class-validator';

export class FilterTagDto {
  @IsUUID('4')
  tagCategoryId: string;
}
