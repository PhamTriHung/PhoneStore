import { IsUUID } from 'class-validator';

export class DeleteMultipleProductStoreDto {
  @IsUUID('4')
  ids: string[];
}
