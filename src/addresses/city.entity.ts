import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { District } from './district.entity';
import { Address } from './address.entity';

@Entity()
export class City {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @OneToMany(() => District, (district) => district.city)
  districts: District[];

  @OneToMany(() => Address, (address) => address.city)
  addresses: Address[];
}
