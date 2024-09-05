import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Review } from './review.entity';
import { Product } from 'src/products/products.entity';
import { User } from 'src/users/users.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { FilterReviewDto } from './dto/filter-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Review) private userRepository: Repository<User>,
  ) {}

  createReview(createReviewDto: CreateReviewDto) {
    const { productId, userId, ...review } = createReviewDto;

    const newReview = this.reviewRepository.create(review);
    newReview.product = this.productRepository.create({ id: productId });
    newReview.user = this.userRepository.create({ id: userId });
    return this.reviewRepository.save(newReview);
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
    const { productId, userId } = updateReviewDto;

    const review = this.reviewRepository.create();

    review.product = this.productRepository.create({ id: productId });
    review.user = this.userRepository.create({ id: userId });

    await this.reviewRepository.update({ id }, review);
    return this.reviewRepository.findOneBy({ id });
  }
}
