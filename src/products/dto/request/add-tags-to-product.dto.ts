import { ArrayNotEmpty, IsArray, IsUUID } from 'class-validator';

export class AddTagsToProductDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  categoryTagCategoryIds: string[];
}
