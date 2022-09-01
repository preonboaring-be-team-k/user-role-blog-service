import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Notice {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string

    @Column()
    description: string

    @CreateDateColumn()
    createAt: Date
    
    // @ManyToOne(() => User, {eager:true})
    // user: User
}