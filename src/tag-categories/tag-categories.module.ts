import { Module } from '@nestjs/common';
import { TagCategoriesController } from './tag-categories.controller';
import { TagCategoriesService } from './tag-categories.service';

@Module({
  controllers: [TagCategoriesController],
  providers: [TagCategoriesService]
})
export class TagCategoriesModule {}
