import { ArrayNotEmpty, IsArray, IsUUID } from 'class-validator';

export class AddAttributeToProductDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  attributeValueIds: string[];
}
