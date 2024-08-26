import { User } from 'src/users/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  country: string;

  @Column({ type: 'varchar' })
  city: string;

  @Column({ type: 'varchar' })
  district: string;

  @Column({ type: 'varchar' })
  ward: string;

  @Column({ type: 'double' })
  longitude: string;

  @Column({ type: 'double' })
  latitude: string;

  @ManyToOne(() => User, (user) => user.addresses)
  user: User;
}
