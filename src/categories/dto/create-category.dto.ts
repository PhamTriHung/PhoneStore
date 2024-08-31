import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Category } from '../category.entity';

export class CreateCategoryDto extends PartialType(Category) {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9\s-]+$/, {
    message:
      'Category value can only contain letters, numbers, spaces, and hyphens.',
  })
  value: string;
}
