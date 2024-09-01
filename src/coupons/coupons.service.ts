import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Coupon } from './coupon.entity';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { FindCouponDto } from './dto/find-coupon-dto';
import { Product } from 'src/products/products.entity';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon) private couponsRepository: Repository<Coupon>,
    @InjectRepository(Product) private productsRepository: Repository<Coupon>,
  ) {}

  createCoupon(createCouponDto: CreateCouponDto) {
    const newCoupon = this.couponsRepository.create(createCouponDto);
    return this.couponsRepository.save(newCoupon);
  }

  findCoupon(findCouponDto?: FindCouponDto) {
    const { productId } = findCouponDto;
    const findCouponOptionsWhere: FindOptionsWhere<Coupon> = {};

    if (productId) {
      findCouponOptionsWhere.products = this.productsRepository.create({
        id: productId,
      });
    }

    return this.couponsRepository.find({ where: findCouponOptionsWhere });
  }

  async deleteCoupon(id: string) {
    const coupon = await this.couponsRepository.findOneBy({ id });

    if (!coupon) {
      throw new NotFoundException(`Coupon with id ${id} not found`);
    } else {
      return this.couponsRepository.remove(coupon);
    }
  }

  async updateCoupon(updateCouponDto: UpdateCouponDto) {
    const { id, ...coupon } = updateCouponDto;
    await this.couponsRepository.update({ id }, coupon);
    return this.couponsRepository.findOneBy({ id });
  }
}
