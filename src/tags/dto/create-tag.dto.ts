import {
  ApiNonAuthoritativeInformationResponse,
  ApiProperty,
  PartialType,
} from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Tag } from '../tag.entity';

export class CreateTagDto {
  @ApiProperty({ default: 'Tag name' })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9\s-]+$/, {
    message: 'Tag name can only contain letters, numbers, spaces, and hyphens.',
  })
  name: string;

  @IsUUID('4')
  @IsOptional()
  tagCategoryId?: string;
}
