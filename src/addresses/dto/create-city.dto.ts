import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { City } from '../city.entity';

export class CreateCityDto extends City {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9\s-]+$/, {
    message:
      'City name can only contain letters, numbers, spaces, and hyphens.',
  })
  name: string;
}
