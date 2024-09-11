import { IsUUID } from 'class-validator';

export class AddStoreToWardDto {
  @IsUUID('4')
  storeId: string;

  @IsUUID('4')
  wardId: string;
}
