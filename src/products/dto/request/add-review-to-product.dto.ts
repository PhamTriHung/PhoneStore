import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class AddReviewToProductDto {
  @IsUUID('4')
  userId: string;

  @IsInt()
  @IsPositive()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @IsNotEmpty()
  reviewText: string;
}
