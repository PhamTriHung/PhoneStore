import { PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Category } from '../category.entity';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9\s-]+$/, {
    message:
      'Category value can only contain letters, numbers, spaces, and hyphens.',
  })
  value: string;

  @IsOptional()
  @IsUUID('4')
  parentCategoryId: string;

  @IsOptional()
  @IsUUID('4', { each: true })
  childCategoryIds: string[];
}
