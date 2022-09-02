import { User } from "../../user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Notice {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ description: 'id'})
    id: string;

    @Column()
    @ApiProperty({ description: '제목' })
    title: string

    @Column()
    @ApiProperty({ description: '본문' })
    description: string

    @CreateDateColumn()
    @ApiProperty({ description: '작성일' })
    createAt: Date
    
    @ApiProperty({ description: '작성자' })
    @ManyToOne(() => User, { eager: true })
    user: User
}