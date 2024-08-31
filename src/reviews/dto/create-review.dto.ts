import { PartialType } from '@nestjs/mapped-types';
import { Review } from '../review.entity';
import { IsUUID } from 'class-validator';

export class CreateReviewDto extends PartialType(Review) {
  @IsUUID('4')
  userId: string;

  @IsUUID('4')
  productId: string;
}
