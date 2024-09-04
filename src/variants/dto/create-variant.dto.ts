import { IsOptional, IsUUID } from 'class-validator';

export class CreateVariantDto {
  @IsUUID('4')
  productId: string;

  @IsUUID('4', { each: true })
  @IsOptional()
  attributeValueIds: string[];
}
