import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Product } from 'src/products/products.entity';
import { RatingDistribution } from 'src/reviews/dto/response/rating-distribution.dto';

export class ProductDto extends OmitType(Product, ['variants']) {
  ratingDistribution: RatingDistribution;

  @ApiProperty({ type: () => [VariantAttributesDto] })
  variants: {
    attributes: VariantAttributesDto[];
  }[];
}

export class VariantAttributesDto {
  @ApiProperty()
  type: string;

  @ApiProperty()
  value: string;
}
