import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import EnvironmentVariables from './types/EnvironmentVariables';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ProductsModule } from './products/products.module';
import { CartsModule } from './carts/carts.module';
import { ProductTypeModule } from './product-type/product-types.module';
import { BrandsModule } from './brands/brands.module';
import { StoresModule } from './stores/stores.module';
import { StoresService } from './stores/stores.service';
import { ProductStoreModule } from './product-store/product-store.module';

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
    CartsModule,
    ProductTypeModule,
    BrandsModule,
    StoresModule,
    ProductStoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
