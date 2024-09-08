import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import EnvironmentVariables from './types/EnvironmentVariables';
import { ProductsModule } from './products/products.module';
import { ProductTypeModule } from './categories/categories.module';
import { StoresModule } from './stores/stores.module';
import { ProductStoreModule } from './product-store/product-store.module';
import { AddressesModule } from './addresses/addresses.module';
import { OrdersModule } from './orders/orders.module';
import { CartItemsModule } from './cart-items/cart-items.module';
import { ReviewsModule } from './reviews/reviews.module';
import { TagsModule } from './tags/tags.module';
import { TagCategoriesModule } from './tag-categories/tag-categories.module';
import { CouponsModule } from './coupons/coupons.module';
import { AttributesModule } from './attributes/attributes.module';
import { VariantsModule } from './variants/variants.module';
import { ShippingsModule } from './shippings/shippings.module';
import { CartsModule } from './carts/carts.module';
import { CaslModule } from './casl/casl.module';
import { CategoryTagCategoriesModule } from './category-tag-categories/category-tag-categories.module';
import { CategoryTagCategoryTagsModule } from './category-tag-category-tags/category-tag-category-tags.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(configService: ConfigService<EnvironmentVariables>) {
        return {
          type: 'mysql',
          host: configService.get('DATABASE_HOST', { infer: true }),
          port: configService.get('DATABASE_PORT', { infer: true }),
          username: configService.get('DATABASE_USERNAME', { infer: true }),
          password: configService.get('DATABASE_PASSWORD', { infer: true }),
          database: configService.get('DATABASE_NAME', { infer: true }),
          entities: ['dist/**/*.entity{.ts,.js}'],
          synchronize: true,
        };
      },
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    CartItemsModule,
    ProductTypeModule,
    StoresModule,
    ProductStoreModule,
    AddressesModule,
    OrdersModule,
    ReviewsModule,
    TagsModule,
    TagCategoriesModule,
    CouponsModule,
    AttributesModule,
    VariantsModule,
    ShippingsModule,
    CartsModule,
    CaslModule,
    CategoryTagCategoriesModule,
    CategoryTagCategoryTagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
