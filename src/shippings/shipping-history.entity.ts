import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ShippingStatus } from './shipping-status.entity';
import { ShippingGroup } from './shipping-group.entity';

@Entity()
export class ShippingHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => ShippingGroup,
    (shippingGroup) => shippingGroup.shippingHistories,
  )
  shippingGroup: ShippingGroup;

  @ManyToOne(
    () => ShippingStatus,
    (shippingStatus) => shippingStatus.shippingHistories,
  )
  shippingStatus: ShippingStatus;
}
