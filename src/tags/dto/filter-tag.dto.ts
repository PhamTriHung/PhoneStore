import { IsOptional, IsUUID } from 'class-validator';

export class FilterTagDto {
  @IsUUID('4')
  @IsOptional()
  tagCategoryId?: string;
}
