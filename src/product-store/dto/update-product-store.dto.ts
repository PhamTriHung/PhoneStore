import { PartialType } from '@nestjs/swagger';
import { CreateProductStoreDto } from './create-product-store.dto';

export class UpdateProductStoreDto extends PartialType(CreateProductStoreDto) {}
