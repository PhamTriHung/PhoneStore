import { PickType } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { CreateReviewDto } from './create-review.dto';

export class FilterReviewDto extends PickType(CreateReviewDto, [
  'productId',
  'userId',
  'rating',
]) {
  @IsUUID('4')
  id: string;
}
