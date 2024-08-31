import { ReviewsService } from './reviews.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { FilterReviewDto } from './dto/filter-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Post()
  createReview(@Body(ValidationPipe) createReviewDto: CreateReviewDto) {
    return this.reviewsService.createReview(createReviewDto);
  }

  @Get()
  findAllReview() {
    return this.reviewsService.findAllReview();
  }

  @Get('search')
  filterReview(@Query(ValidationPipe) filterReviewDto: FilterReviewDto) {
    return this.reviewsService.filterReview(filterReviewDto);
  }

  @Patch(':id')
  updateReview(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    updateReviewDto.id = id;
    return this.reviewsService.updateReview(updateReviewDto);
  }

  @Delete(':id')
  deleteReview(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.reviewsService.deleteReview(id);
  }
}
