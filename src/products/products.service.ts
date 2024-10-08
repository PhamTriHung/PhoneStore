import { AddTagToProductDto } from './dto/request/add-tag-to-product.dto';
import { Product } from 'src/products/products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/request/create-product.dto';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  Between,
  FindOptionsOrder,
  FindOptionsWhere,
  In,
  IsNull,
  LessThan,
  MoreThan,
  Not,
  Repository,
} from 'typeorm';
import { FilterProductDto } from './dto/request/filter-product.dto';
import { UpdateProductDto } from './dto/request/update-product.dto';
import { Category } from 'src/categories/category.entity';
import { AttributeValue } from 'src/attributes/attribute-value.entity';
import { Variant } from 'src/variants/variant.entity';
import { Review } from 'src/reviews/review.entity';
import { RatingDistributionItem } from 'src/reviews/dto/response/rating-distribution.dto';
import { ProductDto } from './dto/response/product.dto';
import { CategoryTagCategoryTag } from 'src/category-tag-category-tags/category-tag-category-tag.entity';
import { findEntityById, isDuplicate } from 'src/utils/database-utils';
import { DeleteTagFromProductDto } from './dto/request/delete-tag-from-product.dto';
import { AddReviewToProductDto } from './dto/request/add-review-to-product.dto';
import { User } from 'src/users/users.entity';
import { Address } from 'src/addresses/address.entity';
import { AddAttributeToProductDto } from './dto/request/add-attribute-to-product.dto';
import { DeleteAttributeValueFromProduct } from './dto/request/delete-attribute-value-from-product.dto';
import { AddVariantToProductDto } from './dto/request/add-variant-to-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(AttributeValue)
    private attributeValuesRepsitory: Repository<AttributeValue>,
    @InjectRepository(Variant) private variantRepository: Repository<Variant>,
    @InjectRepository(Review) private reviewsRepository: Repository<Review>,
    @InjectRepository(CategoryTagCategoryTag)
    private categoryTagCategoryTagsRepository: Repository<CategoryTagCategoryTag>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const {
      categoryId,
      categoryTagCategoryTagIds,
      variantAttributeValueIds,
      productAttributeValueIds,
      ...product
    } = createProductDto;

    if (await isDuplicate(this.productRepository, 'name', product.name)) {
      throw new BadRequestException(`Product name ${product.name} dupplicated`);
    }

    if (await isDuplicate(this.productRepository, 'slug', product.slug)) {
      throw new BadRequestException(`Product slug ${product.slug} dupplicated`);
    }

    const newProduct = this.productRepository.create(product);
    const baseVariant = this.variantRepository.create({ name: product.name });

    newProduct.variants = [baseVariant];

    if (categoryId) {
      newProduct.category = await this.categoryRepository.findOneBy({
        id: categoryId,
      });
    }

    if (categoryTagCategoryTagIds && categoryTagCategoryTagIds.length > 0) {
      newProduct.categoryTagCategoryTags =
        await this.categoryTagCategoryTagsRepository.findBy({
          id: In(categoryTagCategoryTagIds),
        });
    }

    if (variantAttributeValueIds && variantAttributeValueIds.length > 0) {
      baseVariant.attributeValues = await this.attributeValuesRepsitory.findBy({
        id: In(variantAttributeValueIds),
      });
    }

    if (productAttributeValueIds && productAttributeValueIds.length > 0) {
      newProduct.attributeValues = await this.attributeValuesRepsitory.findBy({
        id: In(productAttributeValueIds),
      });
    }

    return this.productRepository.save(newProduct);
  }

  async find(filterProductDto: FilterProductDto): Promise<Product[]> {
    const {
      lowestPrice,
      highestPrice,
      categoryId,
      isMonopoly,
      isDiscount,
      orderType,
    } = filterProductDto;

    const findProductOptionsWhere: FindOptionsWhere<Product | Product[]> = {};
    const findProductOptionsOrder: FindOptionsOrder<Product | Product[]> = {};

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
      // } else if (categoryTagCategoryIds) {
      //   findProductOptionsWhere.categoryTagCategories =
      //     await this.categoryTagCategoriesRepository.findBy({
      //       id: In(categoryTagCategoryIds),
      //     });
    } else if (isMonopoly) {
      findProductOptionsWhere.isMonopoly = true;
    } else if (isDiscount) {
      findProductOptionsWhere.discountPrice = Not(IsNull());
    }

    if (['asc', 'desc'].includes(orderType)) {
      findProductOptionsOrder.price = orderType;
    }

    return this.productRepository.find({
      where: findProductOptionsWhere,
      order: findProductOptionsOrder,
    });
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
        .leftJoinAndSelect('product.variants', 'variant')
        .leftJoinAndSelect('product.attributeValues', 'productAttributeValue')
        .leftJoinAndSelect('variant.attributeValues', 'variantAttributeValue')
        .leftJoinAndSelect('variantAttributeValue.attribute', 'attribute')
        .where('product.id = :id', { id })
        .orderBy('review.createDate', 'DESC')
        .getOne();
    } else if (slug) {
      product = await this.productRepository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.reviews', 'review')
        .leftJoinAndSelect('product.variants', 'variant')
        .leftJoinAndSelect('product.attributeValues', 'productAttributeValue')
        .leftJoinAndSelect('variant.attributeValues', 'variantAttributeValue')
        .leftJoinAndSelect('variantAttributeValue.attribute', 'attribute')
        .where('product.slug = :slug', { slug })
        .orderBy('review.createDate', 'DESC')
        .getOne();
    }

    if (!product) {
      throw new NotFoundException(`Product with Id ${id} not found`);
    } else {
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
      return {
        ...product,
        variants: this.processVariantAttributeArray(product.variants),
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
    const { categoryId, categoryTagCategoryTagIds, ...updateField } =
      updateProductDto;

    const product = this.productRepository.create(updateField);

    if (
      product.name &&
      (await isDuplicate(this.productRepository, 'name', product.name))
    ) {
      throw new BadRequestException(`Product name ${product.name} dupplicated`);
    }

    if (
      product.slug &&
      (await isDuplicate(this.productRepository, 'slug', product.slug))
    ) {
      throw new BadRequestException(`Product slug ${product.slug} dupplicated`);
    }

    if (categoryId) {
      const category = await findEntityById(
        this.categoryRepository,
        categoryId,
      );

      product.category = category;
    }

    if (categoryTagCategoryTagIds && categoryTagCategoryTagIds.length > 0) {
      product.categoryTagCategoryTags =
        await this.categoryTagCategoryTagsRepository.findBy({
          id: In(categoryTagCategoryTagIds),
        });
    }

    await this.productRepository.update({ id }, product);

    return this.productRepository.findOneBy({ id });
  }

  processVariantAttributeArray(variants: Variant[]) {
    return variants.map((variant) => {
      return {
        attributes: variant.attributeValues.map((attributeValue) => {
          return {
            type: attributeValue.attribute.name,
            value: attributeValue.value,
          };
        }),
      };
    });
  }

  async addTagToProduct(categoryTagCategoryTagId, productId) {
    const categoryTagCategoryTag = await findEntityById(
      this.categoryTagCategoryTagsRepository,
      categoryTagCategoryTagId,
    );

    const product = await this.productRepository.findOne({
      where: {
        id: productId,
      },
      relations: {
        categoryTagCategoryTags: true,
      },
    });

    product.categoryTagCategoryTags.push(categoryTagCategoryTag);

    return this.productRepository.save(product);
  }

  async deleteTagFromProduct({
    categoryTagCategoryTagId,
    productId,
  }: DeleteTagFromProductDto) {
    const product = await this.productRepository.findOne({
      where: {
        id: productId,
      },
      relations: {
        categoryTagCategoryTags: true,
      },
    });

    product.categoryTagCategoryTags = product.categoryTagCategoryTags.filter(
      (categoryTagCategoryTag) => {
        return !(categoryTagCategoryTag.id === categoryTagCategoryTagId);
      },
    );
  }

  async findAllTagOfProduct(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: {
        categoryTagCategoryTags: {
          tag: true,
        },
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with this id ${id} not found`);
    }

    return product.categoryTagCategoryTags;
  }

  async addVariantToProduct(
    productId: string,
    { attributeValueIds }: AddVariantToProductDto,
  ) {
    const product = await this.productRepository.findOne({
      where: {
        id: productId,
      },
      relations: {
        variants: true,
      },
    });

    const newVariant = this.variantRepository.create({
      name: product.name,
    });

    if (attributeValueIds && attributeValueIds.length > 0) {
      const attributeValues = await this.attributeValuesRepsitory.findBy({
        id: In(attributeValueIds),
      });

      newVariant.attributeValues = attributeValues;
    }

    product.variants.push(newVariant);

    return this.productRepository.save(product);
  }

  async addReviewToProduct(
    productId: string,
    addReviewToProductDto: AddReviewToProductDto,
  ) {
    const { userId } = addReviewToProductDto;

    if (userId) {
      const product = await this.productRepository.findOne({
        where: {
          id: productId,
        },
        relations: {
          reviews: true,
        },
      });

      if (!product) {
        throw new NotFoundException(`Product with id ${productId} not found`);
      }

      const user = await this.usersRepository.findOneBy({
        id: userId,
      });

      if (!user) {
        throw new NotFoundException(`User with id ${userId} not found`);
      }

      const newReview = this.reviewsRepository.create({
        user,
        product,
        ...addReviewToProductDto,
      });

      product.reviews.push(newReview);

      return this.productRepository.save(product);
    } else {
      throw new BadRequestException(`A review must come from one user`);
    }
  }

  async addAttributeToProduct(
    productId: string,
    { attributeValueIds }: AddAttributeToProductDto,
  ) {
    const product = await this.productRepository.findOne({
      where: {
        id: productId,
      },
      relations: {
        attributeValues: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }

    const attributeValues = await this.attributeValuesRepsitory.findBy({
      id: In(attributeValueIds),
    });

    if (attributeValues.length !== attributeValueIds.length) {
      const foundIds = attributeValues.map(
        (attributeValue) => attributeValue.id,
      );
      const notFoundIds = attributeValueIds.filter(
        (attributeValueId) => !foundIds.includes(attributeValueId),
      );

      throw new NotFoundException(
        `Attribute with ids ${notFoundIds.join(', ')} not found`,
      );
    }

    product.attributeValues = attributeValues;

    return this.productRepository.save(product);
  }

  async deleteAttributeFromProduct(
    productId: string,
    { attributeValueIds }: DeleteAttributeValueFromProduct,
  ) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: { attributeValues: true },
    });
    const attributeValues = await this.attributeValuesRepsitory.findBy({
      id: In(attributeValueIds),
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }

    if (attributeValues.length !== attributeValueIds.length) {
      const foundIds = attributeValues.map(
        (attributeValue) => attributeValue.id,
      );
      const notFoundIds = attributeValueIds.filter(
        (attributeValueId) => !foundIds.includes(attributeValueId),
      );

      throw new NotFoundException(
        `Attribute value with ids ${notFoundIds.join(', ')} not found`,
      );
    }

    product.attributeValues = product.attributeValues.filter(
      (attributeValue) => {
        !attributeValues.some(
          (attributeValue2) => attributeValue2.id === attributeValue.id,
        );
      },
    );

    this.productRepository.save(product);
  }
}
