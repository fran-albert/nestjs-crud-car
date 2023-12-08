import { Car } from 'src/cars/entities/car.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Owner {
  @Column({ primary: true, generated: true })
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Car, (car) => car.owner)
  cars: Car[];
}
