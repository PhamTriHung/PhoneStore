import { ArrayNotEmpty, IsArray, IsOptional, IsUUID } from 'class-validator';

export class AddVariantToProductDto {
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  attributeValueIds?: string[];
}
