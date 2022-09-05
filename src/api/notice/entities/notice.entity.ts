import { UserEntity } from "../../user/entities/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

@Entity()
export class Notice extends BaseEntity{
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'id'})
    id: number;

    @IsString()
    @IsNotEmpty()
    @Column()
    @ApiProperty({ description: '제목' })
    title: string

    @IsString()
    @IsNotEmpty()
    @Column()
    @ApiProperty({ description: '본문' })
    description: string

    @IsDate()
    @IsNotEmpty()
    @CreateDateColumn()
    @ApiProperty({ description: '작성일' })
    createAt: Date

    @ApiProperty({ description: '작성자' })
    @ManyToOne(() => UserEntity, { eager: true })
    user: UserEntity
}