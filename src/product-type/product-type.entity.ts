import { Brand } from 'src/brands/brand.entity';
import { Product } from 'src/products/products.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ProductType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  value: string;

  @ManyToMany(() => Brand, (brand) => brand.productTypes)
  @JoinTable()
  brands: Brand[];

  @OneToMany(() => Product, (product) => product.productType)
  products: Product[];
}
