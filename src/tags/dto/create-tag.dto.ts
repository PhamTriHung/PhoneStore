import { PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Tag } from '../tag.entity';

export class CreateTagDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9\s-]+$/, {
    message:
      'Product name can only contain letters, numbers, spaces, and hyphens.',
  })
  name: string;

  @IsUUID('4')
  tagCategoryId: string;
}
