import { ArrayNotEmpty, arrayNotEmpty, IsArray, IsUUID } from 'class-validator';

export class DeleteAttributeValueFromProduct {
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  attributeValueIds: string[];
}
