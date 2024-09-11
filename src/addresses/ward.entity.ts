import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { District } from './district.entity';
import { Address } from './address.entity';
import { Store } from 'src/stores/store.entity';

@Entity()
export class Ward {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @OneToMany(() => Address, (address) => address.ward)
  addresses: Address[];

  @OneToMany(() => Store, (store) => store.ward)
  stores: Store[];

  @ManyToOne(() => District, (district) => district.wards)
  district: District;
}
