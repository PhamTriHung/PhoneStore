import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateVariantDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  @Matches(/^[\p{L}\s0-9-]+$/u, {
    message:
      'Variant name can only contain letters, numbers, spaces, and hyphens.',
  })
  @ApiProperty({ default: 'Variant name' })
  name: string;

  @IsUUID('4')
  productId: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  attributeValueIds: string[];
}
