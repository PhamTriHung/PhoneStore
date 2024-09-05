import { PartialType } from '@nestjs/swagger';
import { Ward } from '../ward.entity';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateWardDto {
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
