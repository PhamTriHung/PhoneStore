import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { City } from './city.entity';
import { Ward } from './ward.entity';
import { Address } from './address.entity';

@Entity()
export class District {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @OneToMany(() => Ward, (ward) => ward.district)
  wards: Ward[];

  @OneToMany(() => Address, (address) => address.district)
  addresses: Address[];

  @ManyToOne(() => City, (city) => city.districts)
  city: City;
}
