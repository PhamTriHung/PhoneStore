import { User } from 'src/users/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { City } from './city.entity';
import { District } from './district.entity';
import { Ward } from './ward.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => City, (city) => city.addresses)
  city: City;

  @ManyToOne(() => District, (district) => district.addresses)
  district: District;

  @ManyToOne(() => Ward, (ward) => ward.addresses)
  ward: Ward;

  // @Column({ type: 'double' })
  // longitude: number;

  // @Column({ type: 'double' })
  // latitude: number;

  @ManyToOne(() => User, (user) => user.addresses)
  user: User;
}
