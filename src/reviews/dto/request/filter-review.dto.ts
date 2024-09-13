import { PickType } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class FilterReviewDto {
  @IsUUID('4')
  id: string;
}
