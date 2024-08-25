import { IsUUID } from 'class-validator';

export class DeleteManyCategoryDto {
  @IsUUID(4, { each: true })
  ids: string[];
}
