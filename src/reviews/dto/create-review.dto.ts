import { PartialType } from '@nestjs/mapped-types';
import { Review } from '../review.entity';
import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateReviewDto extends PartialType(Review) {
  @IsUUID('4')
  userId: string;

  @IsUUID('4')
  productId: string;

  @IsInt()
  @IsPositive()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @IsNotEmpty()
  reviewText: string;
}
