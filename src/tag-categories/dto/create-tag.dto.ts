import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TagCategory } from '../tag-category.entity';

export class CreateTagCategoryDto extends PartialType(TagCategory) {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9\s-]+$/, {
    message:
      'Product name can only contain letters, numbers, spaces, and hyphens.',
  })
  name: string;
}
