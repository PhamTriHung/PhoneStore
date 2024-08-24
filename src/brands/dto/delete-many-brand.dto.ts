import { IsUUID } from 'class-validator';

export class DeleteManyBrandDto {
  @IsUUID(4, { each: true })
  ids: string[];
}
