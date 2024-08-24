import { IsUUID } from 'class-validator';

export class DeleteManyProductTypeDto {
  @IsUUID(4, { each: true })
  ids: string[];
}
