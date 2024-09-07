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
import { CreateReviewDto } from './dto/create-review.dto';
import { FilterReviewDto } from './dto/filter-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { log } from 'console';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createReview(createReviewDto: CreateReviewDto) {
    const { productId, userId, ...review } = createReviewDto;

    if (!productId || !userId) return;

    const product = await this.productRepository.findOneBy({ id: productId });
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!product)
      throw new NotFoundException(`Product with id ${productId} not found`);

    if (!user) throw new NotFoundException(`User with id ${userId} not found`);

    const newReview = this.reviewRepository.create({
      ...review,
    });

    newReview.user = user;
    newReview.product = product;

    await this.reviewRepository.save(newReview);

    const reviewStatistic = await this.getReviewStatistics(productId);

    product.numOfReview = reviewStatistic.numOfReview;
    product.rating = reviewStatistic.rating;

    await this.productRepository.update(productId, product);

    return newReview;
  }

  findAllReview() {
    return this.reviewRepository.find();
  }

  filterReview(filterReviewDto: FilterReviewDto) {
    const { reviewId, productId } = filterReviewDto;
    const filterReviewFindOptionsWhere: FindOptionsWhere<Review> = {};

    if (reviewId) {
      filterReviewFindOptionsWhere.id = reviewId;
    }

    if (productId) {
      const product = this.productRepository.create({ id: productId });
      filterReviewFindOptionsWhere.product = product;
    }

    return this.reviewRepository.findBy(filterReviewFindOptionsWhere);
  }

  async deleteReview(id: string) {
    const review = await this.reviewRepository.findOneBy({ id });

    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found`);
    } else {
      return review;
    }
  }

  async updateReview(id: string, updateReviewDto: UpdateReviewDto) {
    const { productId, userId, ...updateField } = updateReviewDto;

    const review = this.reviewRepository.create(updateField);

    review.product = this.productRepository.create({ id: productId });

    review.user = this.userRepository.create({ id: userId });
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
        result.averageRating !== null
          ? Math.round(parseFloat(result.averageRating) * 2) / 2
          : 0,
    };
  }
}
