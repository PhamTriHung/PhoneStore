import { OrderItem } from 'src/order-items/order-item.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'datetime' })
  orderApprovedAt: Date;

  @Column({ type: 'datetime' })
  orderDeliveredDate: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  orderItems: OrderItem[];

  @ManyToOne(() => User, (user) => user.orders)
  user: User;
}
