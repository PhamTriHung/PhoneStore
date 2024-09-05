import { PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Store } from '../store.entity';

export class CreateStoreDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9\s-]+$/, {
    message:
      'Store name can only contain letters, numbers, spaces, and hyphens.',
  })
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9\s-]+$/, {
    message:
      'Store address can only contain letters, numbers, spaces, and hyphens.',
  })
  address: string;
}
