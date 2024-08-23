import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  value: string;
}
