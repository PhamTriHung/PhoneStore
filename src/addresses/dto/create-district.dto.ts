import { District } from './../district.entity';
import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateDistrictDto extends PartialType(District) {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9\s-]+$/, {
    message:
      'District name can only contain letters, numbers, spaces, and hyphens.',
  })
  name: string;
}
