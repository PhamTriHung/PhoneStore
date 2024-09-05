import { IsUUID } from 'class-validator';

export class DeleteMultipleStoreDto {
  @IsUUID('4', { each: true })
  ids: string[];
}
