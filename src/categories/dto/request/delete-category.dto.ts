import { ArrayNotEmpty, IsArray, IsUUID } from 'class-validator';

export class DeleteManyCategoryDto {
  @IsUUID(4, { each: true })
  @IsArray()
  @ArrayNotEmpty()
  ids: string[];
}
