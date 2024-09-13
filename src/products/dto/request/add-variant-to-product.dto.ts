import { ArrayNotEmpty, IsArray, IsUUID } from 'class-validator';

export class AddVariantToProductDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  attributeValueIds: string[];
}
