import { Product } from 'src/products/products.entity';
import { RatingDistribution } from 'src/reviews/dto/response/rating-distribution.dto';

export class ProductDto extends Product {
  ratingDistribution: RatingDistribution;
}
