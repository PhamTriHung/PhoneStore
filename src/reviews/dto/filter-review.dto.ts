import { IsUUID } from 'class-validator';

export class FilterReviewDto {
  @IsUUID('4')
  reviewId: string;

  @IsUUID('4')
  productId: string;
}
