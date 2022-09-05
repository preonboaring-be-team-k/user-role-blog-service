import { UserEntity } from "../../user/entities/user.entity";
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
    
    @ManyToOne(() => UserEntity, { eager: true })
    user: UserEntity
}