import { IsString } from 'class-validator';

export class CreateProductTypeDto {
  @IsString()
  value: string;
}
