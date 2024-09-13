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
import { UpdateReviewDto } from './dto/request/update-review.dto';
import { ApiTags } from '@nestjs/swagger';
import { FilterReviewDto } from './dto/request/filter-review.dto';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

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
    return this.reviewsService.updateReview(id, updateReviewDto);
  }

  @Delete(':id')
  deleteReview(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.reviewsService.deleteReview(id);
  }
}
