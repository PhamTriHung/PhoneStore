import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ShippingGroup } from './shipping-group.entity';
import { ShippingHistory } from './shipping-history.entity';

@Entity()
export class ShippingStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @OneToMany(() => ShippingGroup, (shipping) => shipping.shippingStatus)
  shippingGroups: ShippingGroup[];

  @OneToMany(
    () => ShippingHistory,
    (shippingHistory) => shippingHistory.shippingStatus,
  )
  shippingHistories: ShippingHistory[];
}
