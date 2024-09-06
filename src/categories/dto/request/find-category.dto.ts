import { PickType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';

export class FindCategoryDto extends PickType(CreateCategoryDto, ['slug']) {}
