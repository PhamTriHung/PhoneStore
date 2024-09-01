import { PartialType } from '@nestjs/mapped-types';
import { CreateTagCategoryDto } from './create-tag.dto';

export class UpdateTagCategoryDto extends PartialType(CreateTagCategoryDto) {}
