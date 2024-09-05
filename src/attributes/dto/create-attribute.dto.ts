import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class CreateAttributeDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  @Matches(/^[A-Za-z\s'-]+$/, {
    message: 'Name can only contain letters, spaces, hyphens, and apostrophes.',
  })
  name: string;
}
