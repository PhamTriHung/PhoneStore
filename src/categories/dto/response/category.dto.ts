import { Category } from 'src/categories/category.entity';
import { Product } from 'src/products/products.entity';
import { TagCategoryDto } from 'src/tag-categories/dto/response/tag-category.dto';

export class CategoryDto {
  id: string;
  value: string;
  childCategories: Category[];
  tagCategories: TagCategoryDto[];
  products: Product[];
}
