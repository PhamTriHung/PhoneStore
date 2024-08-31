import { PartialType } from '@nestjs/mapped-types';
import { Ward } from '../ward.entity';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateWardDto extends PartialType(Ward) {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9\s-]+$/, {
    message:
      'Ward name can only contain letters, numbers, spaces, and hyphens.',
  })
  name: string;
}
