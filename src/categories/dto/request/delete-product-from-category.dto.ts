import { IsUUID } from 'class-validator';

export class DeleteProductFromCategoryDto {
  @IsUUID('4')
  productId: string;

  @IsUUID('4')
  categoryId: string;
}
