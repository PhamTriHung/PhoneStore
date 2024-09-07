import { TagCategoriesService } from './../tag-categories/tag-categories.service';
import { Coupon } from 'src/coupons/coupon.entity';
import { Product } from 'src/products/products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/request/create-product.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  Between,
  FindOptionsWhere,
  In,
  LessThan,
  MoreThan,
  Repository,
} from 'typeorm';
import { FilterProductDto } from './dto/request/filter-product.dto';
import { UpdateProductDto } from './dto/request/update-product.dto';
import { Category } from 'src/categories/category.entity';
import { Tag } from 'src/tags/tag.entity';
import { AttributeValue } from 'src/attributes/attribute-value.entity';
import { Variant } from 'src/variants/variant.entity';
import { CategoryTagCategory } from 'src/category-tag-categories/category-tag-category.entity';
import { Review } from 'src/reviews/review.entity';
import { count } from 'console';
import { RatingDistributionItem } from 'src/reviews/dto/response/rating-distribution.dto';
import { ProductDto } from './dto/response/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Tag) private tagRepository: Repository<Tag>,
    @InjectRepository(AttributeValue)
    private attributeValuesRepsitory: Repository<AttributeValue>,
    @InjectRepository(Variant) private variantRepository: Repository<Variant>,
    @InjectRepository(CategoryTagCategory)
    private categoryTagCategoriesRepository: Repository<CategoryTagCategory>,
    @InjectRepository(Review) private reviewsRepository: Repository<Review>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const {
      categoryId,
      categoryTagCategoryIds,
      attributeValueIds,
      ...product
    } = createProductDto;

    const newProduct = this.productRepository.create(product);
    const baseVariant = this.variantRepository.create();

    newProduct.variants = [baseVariant];

    if (categoryId) {
      newProduct.category = await this.categoryRepository.findOneBy({
        id: categoryId,
      });
    }

    if (categoryTagCategoryIds && categoryTagCategoryIds.length > 0) {
      newProduct.categoryTagCategories =
        await this.categoryTagCategoriesRepository.findBy({
          id: In(categoryTagCategoryIds),
        });
    }

    if (attributeValueIds && attributeValueIds.length > 0) {
      baseVariant.attributeValues = await this.attributeValuesRepsitory.findBy({
        id: In(attributeValueIds),
      });
    }

    return this.productRepository.save(newProduct);
  }

  async find(filterProductDto: FilterProductDto): Promise<Product[]> {
    const {
      lowestPrice,
      highestPrice,
      categoryId,
      categoryTagCategoryIds,
      slug,
    } = filterProductDto;
    const findProductOptionsWhere: FindOptionsWhere<Product | Product[]> = {};

    if (lowestPrice && highestPrice) {
      findProductOptionsWhere.price = Between(lowestPrice, highestPrice);
    } else if (lowestPrice) {
      findProductOptionsWhere.price = MoreThan(lowestPrice);
    } else if (highestPrice) {
      findProductOptionsWhere.price = LessThan(highestPrice);
    } else if (categoryId) {
      findProductOptionsWhere.category = await this.categoryRepository.findOne({
        where: { id: categoryId },
      });
    } else if (categoryTagCategoryIds) {
      findProductOptionsWhere.categoryTagCategories =
        await this.tagRepository.findBy({
          id: In(categoryTagCategoryIds),
        });
    } else if (slug) {
      findProductOptionsWhere.slug = slug;
    }

    return Object.keys(findProductOptionsWhere).length > 0
      ? this.productRepository.find({ where: findProductOptionsWhere })
      : this.productRepository.find();
  }

  async findByIdOrSlug({
    id,
    slug,
  }: {
    id?: string;
    slug?: string;
  }): Promise<ProductDto> {
    let product: Product;

    if (id) {
      product = await this.productRepository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.reviews', 'review')
        .where('product.id = :id', { id })
        .orderBy('review.createDate', 'DESC')
        .getOne();
    } else if (slug) {
      product = await this.productRepository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.reviews', 'review')
        .where('product.slug = :slug', { slug })
        .orderBy('review.createDate', 'DESC')
        .getOne();
    }

    const totalReviewCount = product.reviews.length;

    if (!id) {
      id = product.id;
    }

    const ratingDistribution = await this.reviewsRepository
      .createQueryBuilder('review')
      .select('review.rating', 'rating')
      .addSelect('CAST(COUNT(rating) AS INT)', 'count')
      .groupBy('review.rating')
      .orderBy('review.rating')
      .where('review.productId = :id', { id })
      .getRawMany();

    const initRatingDistributionItems: RatingDistributionItem[] = Array.from(
      { length: 5 },
      (_, i) => {
        return {
          rating: (i + 1).toString(),
          count: 0,
          percentage: 0,
        };
      },
    );

    ratingDistribution.forEach(
      (ratingDistributionItem: { count: string; rating: number }) => {
        const { count, rating } = ratingDistributionItem;

        initRatingDistributionItems[ratingDistributionItem.rating] = {
          rating: rating.toString(),
          count: parseInt(count),
          percentage: Math.round(parseInt(count) / totalReviewCount) * 100,
        };
      },
    );

    if (!product) {
      throw new NotFoundException(`Product with Id ${id} not found`);
    } else {
      return {
        ...product,
        ratingDistribution: {
          items: initRatingDistributionItems,
        },
      };
    }
  }

  async deleteById(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with Id ${id} not found`);
    } else {
      return this.productRepository.remove(product);
    }
  }

  async deleteManyByIds(ids: string[]): Promise<Product[]> {
    const products = await this.productRepository.find({
      where: { id: In(ids) },
    });

    return this.productRepository.remove(products);
  }

  async updateProductById(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const { categoryId, categoryTagCategoryIds, ...updateField } =
      updateProductDto;
    const product = this.productRepository.create(updateField);

    if (categoryId) {
      product.category = await this.categoryRepository.findOne({
        where: { id: categoryId },
      });
    }

    if (categoryTagCategoryIds && categoryTagCategoryIds.length > 0) {
      product.categoryTagCategories =
        await this.categoryTagCategoriesRepository.findBy({
          id: In(categoryTagCategoryIds),
        });
    }

    await this.productRepository.update({ id }, product);

    return this.productRepository.findOneBy({ id });
  }

  async addTagsToProduct(id: string, categoryTagCategoryIds: string[]) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: { categoryTagCategories: true },
    });

    const categoryTagCategories =
      await this.categoryTagCategoriesRepository.findBy({
        id: In(categoryTagCategoryIds),
      });

    product.categoryTagCategories = categoryTagCategories;

    return this.productRepository.save(product);
  }
}
