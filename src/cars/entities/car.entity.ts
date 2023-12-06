import { Column, DeleteDateColumn, Entity } from "typeorm";

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

}
