import { PartialType } from '@nestjs/mapped-types';
import { Brand } from '../brand.entity';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateBrandDto extends PartialType(Brand) {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9\s]+$/, {
    message: 'Brand name can only contain letters, numbers, and spaces.',
  })
  brandName: string;
}
