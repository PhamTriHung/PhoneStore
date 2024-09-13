import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Review } from './review.entity';
import { Product } from 'src/products/products.entity';
import { User } from 'src/users/users.entity';
import { UpdateReviewDto } from './dto/request/update-review.dto';
import { log } from 'console';
import { FilterReviewDto } from './dto/request/filter-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findAllReview() {
    return this.reviewRepository.find();
  }

  filterReview(filterReviewDto: FilterReviewDto) {
    const { id } = filterReviewDto;
    const filterReviewFindOptionsWhere: FindOptionsWhere<Review> = {};

    if (id) {
      filterReviewFindOptionsWhere.id = id;
    }

    // if (productId) {
    //   const product = this.productRepository.create({ id: productId });
    //   filterReviewFindOptionsWhere.product = product;
    // }

    return this.reviewRepository.findBy(filterReviewFindOptionsWhere);
  }

  async deleteReview(id: string) {
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: { product: true },
    });

    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found`);
    } else {
      await this.reviewRepository.remove(review);

      const productId = review.product.id;
      const product = review.product;

      const reviewStatistic = await this.getReviewStatistics(productId);

      product.numOfReview = reviewStatistic.numOfReview;
      product.rating = reviewStatistic.rating;

      await this.productRepository.update(productId, product);

      return review;
    }
  }

  async updateReview(id: string, updateReviewDto: UpdateReviewDto) {
    const { ...updateField } = updateReviewDto;

    const review = this.reviewRepository.create(updateField);

    // review.product = this.productRepository.create({ id: productId });

    // review.user = this.userRepository.create({ id: userId });
    await this.reviewRepository.update({ id }, review);

    return this.reviewRepository.findOneBy({ id });
  }

  async getReviewStatistics(productId: string) {
    const result = await this.reviewRepository
      .createQueryBuilder('review')
      .select('COUNT(review.id)', 'count')
      .addSelect('AVG(review.rating)', 'averageRating')
      .where('review.productId = :productId', { productId })
      .getRawOne();

    return {
      numOfReview: Number(result.count) || 0,
      rating:
        result.averageRating !== null ? parseFloat(result.averageRating) : 0,
    };
  }
}
