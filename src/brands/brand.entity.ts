import { ProductType } from 'src/product-type/product-type.entity';
import { Product } from 'src/products/products.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  brandName: string;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];

  @ManyToMany(() => ProductType, (productType) => productType.brands)
  productTypes: ProductType[];
}
