import { PartialType } from '@nestjs/swagger';
import { AttributeValue } from '../attribute-value.entity';
import { IsNotEmpty, IsString, Length, Matches, IsUUID } from 'class-validator';

export class CreateAttributeValueDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  @Matches(/^[\p{L}\s0-9'-\(\)+]+$/u, {
    message:
      'Attribute value can only contain letters, spaces, hyphens, and apostrophes.',
  })
  value: string;

  @IsUUID('4')
  attributeId?: string;
}
