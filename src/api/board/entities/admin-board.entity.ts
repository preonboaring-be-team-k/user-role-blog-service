import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class AdminBoard {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    discription: string

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt?: Date;

    @DeleteDateColumn()
    deleteAt?: Date | null;

    @Column()
    isDeleted: boolean;

    constructor(title: string, discription: string) {
        this.title = title;
        this.discription = discription;
        this.isDeleted = false;
    }
}