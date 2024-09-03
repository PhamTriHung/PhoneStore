import { AttributeValue } from 'src/attributes/attribute-value.entity';
import { ProductStore } from 'src/product-store/product-store.entity';
import { Product } from 'src/products/products.entity';
import {
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Variant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => AttributeValue, (attributeValue) => attributeValue.variants)
  attributeValues: AttributeValue[];

  @ManyToOne(() => Product, (product) => product.variants)
  product: Product;

  @OneToMany(() => ProductStore, (productStore) => productStore.variant)
  productStores: ProductStore[];
}
