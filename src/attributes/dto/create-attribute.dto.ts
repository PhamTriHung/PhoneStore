import { PartialType } from '@nestjs/mapped-types';
import { Attribute } from './../attribute.entity';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class CreateAttributeDto extends PartialType(Attribute) {
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  @Matches(/^[A-Za-z\s'-]+$/, {
    message: 'Name can only contain letters, spaces, hyphens, and apostrophes.',
  })
  name: string;
}
