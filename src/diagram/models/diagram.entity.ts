import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DiagramEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    description: string;

    @Column({unique: true})
    version: string;

    @Column({select: false})
    xmlcontent: string;

}