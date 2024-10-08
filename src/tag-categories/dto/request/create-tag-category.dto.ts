import {
  ApiProcessingResponse,
  ApiProperty,
  PartialType,
} from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TagCategory } from '../../tag-category.entity';

export class CreateTagCategoryDto {
  @ApiProperty({ default: 'Tag category name' })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @Matches(/^[\p{L}\s0-9-]+$/u, {
    message:
      'Tag category name can only contain letters, numbers, spaces, and hyphens.',
  })
  name: string;

  @IsOptional()
  @IsUUID('4')
  categoryId?: string;
}
