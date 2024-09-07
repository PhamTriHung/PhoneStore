import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class CreateAttributeDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  @Matches(/^[\p{L}\s0-9-]+$/u, {
    message: 'Name can only contain letters, spaces, hyphens, and apostrophes.',
  })
  name: string;
}
