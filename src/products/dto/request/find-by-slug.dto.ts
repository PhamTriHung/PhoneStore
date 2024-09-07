import { PickType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

export class FindBySlugDto extends PickType(CreateProductDto, ['slug']) {}
