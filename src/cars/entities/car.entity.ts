import { Owner } from 'src/owners/entities/owner.entity';
import { Column, DeleteDateColumn, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Car {
  @Column({ primary: true, generated: true })
  id: number;

  @Column()
  brand: string;

  @Column()
  color: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Owner, (owner) => owner.id, {
    eager: true,
  })
  owner: Owner;
}
