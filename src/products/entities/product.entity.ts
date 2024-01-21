import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('text', { nullable: true })
  description: string;

  @Column('float', { default: 0 })
  price: number;

  @Column('int', { default: 0 })
  stock: number;
}
