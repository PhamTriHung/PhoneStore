import { IsUUID } from 'class-validator';

export class AddTagToProductDto {
  @IsUUID('4')
  categoryTagCategoryTagId: string;

  @IsUUID('4')
  productId: string;
}
