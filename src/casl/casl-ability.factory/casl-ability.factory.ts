import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Address } from 'src/addresses/address.entity';
import { City } from 'src/addresses/city.entity';
import { District } from 'src/addresses/district.entity';
import { Ward } from 'src/addresses/ward.entity';
import { AttributeValue } from 'src/attributes/attribute-value.entity';
import { Attribute } from 'src/attributes/attribute.entity';
import { CartItem } from 'src/cart-items/cart-item.entity';
import { Cart } from 'src/carts/cart.entity';
import { Category } from 'src/categories/category.entity';
import { Coupon } from 'src/coupons/coupon.entity';
import { OrderItem } from 'src/orders/order-item.entity';
import { Order } from 'src/orders/order.entity';
import { ProductStore } from 'src/product-store/product-store.entity';
import { Product } from 'src/products/products.entity';
import { Review } from 'src/reviews/review.entity';
import { ShippingGroup } from 'src/shippings/shipping-group.entity';
import { ShippingHistory } from 'src/shippings/shipping-history.entity';
import { ShippingStatus } from 'src/shippings/shipping-status.entity';
import { Store } from 'src/stores/store.entity';
import { TagCategory } from 'src/tag-categories/tag-category.entity';
import { Tag } from 'src/tags/tag.entity';
import { User } from 'src/users/users.entity';

type Subjects = InferSubjects<
  | typeof Attribute
  | typeof AttributeValue
  | typeof CartItem
  | typeof Cart
  | typeof Category
  | typeof Coupon
  | typeof Order
  | typeof OrderItem
  | typeof ProductStore
  | typeof Product
  | typeof OrderItem
  | typeof Review
  | typeof Store
  | typeof ShippingGroup
  | typeof ShippingHistory
  | typeof ShippingStatus
  | typeof Tag
  | typeof TagCategory
  | typeof City
  | typeof District
  | typeof Ward
  | typeof Address
  | 'all'
>;

enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);
  }
}
