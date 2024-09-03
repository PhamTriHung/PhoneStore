import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Attribute } from './attribute.entity';
import { Variant } from 'src/variants/variant.entity';

@Entity()
export class AttributeValue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  value: string;

  @ManyToOne(() => Attribute, (attribute) => attribute.attributeValues)
  attribute: Attribute;

  @ManyToMany(() => Variant, (variant) => variant.attributeValues)
  variants: Variant[];
}
