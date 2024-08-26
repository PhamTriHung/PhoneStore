import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Laptop {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  cpuName: string;

  @Column({ type: 'int' })
  numCpuCore: number;

  @Column({ type: 'int' })
  numCpuThread: number;

  @Column({ type: 'double' })
  cpuClockSpeed: number;

  @Column({ type: 'int' })
  cpuCache: number;

  @Column({ type: 'int' })
  ramCapacity: number;

  @Column({ type: 'int' })
  ramType: number;

  @Column({ type: 'int' })
  ramBus: number;

  @Column({ type: 'int' })
  storageCapacity: number;

  @Column({ type: 'int' })
  laptopSize: number;

  @Column({ type: 'int' })
  resolutionHeight: number;

  @Column({ type: 'int' })
  resolutionWidth: number;

  @Column({ type: 'int' })
  refreshRate: number;

  @Column({ type: 'int' })
  colorGamut: number;

  @Column({ type: 'int' })
  height: number;

  @Column({ type: 'int' })
  width: number;

  @Column({ type: 'int' })
  weight: number;
}
