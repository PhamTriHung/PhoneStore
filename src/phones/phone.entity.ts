import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Phone {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  ramCapacity: number;

  @Column({ type: 'int' })
  storageCapacity: number;

  @Column({ type: 'int' })
  batteryCapacity: number;

  @Column({ type: 'int' })
  refreshRate: number;

  @Column({ type: 'int' })
  resolutionHeight: number;

  @Column({ type: 'int' })
  resolutionWidth: number;

  @Column({ type: 'varchar' })
  screenTechnology: string;

  @Column({ type: 'int' })
  phoneWeight: number;

  @Column({ type: 'int' })
  phoneHeight: number;

  @Column({ type: 'int' })
  phoneWidth: number;

  @Column({ type: 'int' })
  phoneSize: number;

  @Column({ type: 'int' })
  maxScreenBrightness: number;

  @Column({ type: 'varchar' })
  operationSystem: string;

  @Column({ type: 'varchar' })
  chargingStandard: string;

  @Column({ type: 'varchar' })
  headphoneConnectionStandard: string;

  @Column({ type: 'int' })
  maxChargingRate: number;
}
