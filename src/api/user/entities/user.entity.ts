import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.enum';
import { Status } from './status.enum';

@Entity('User')
export class User {
  @ApiProperty({
    example: 1,
    description: 'id - 자동생성',
    required: true,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'seastory624@gmail.com',
    description: '이메일',
    required: true,
  })
  @Column()
  email: string;

  @ApiProperty({ example: '홍길동', description: '이름', required: true })
  @Column()
  name: string;

  @ApiProperty({ example: 'Test123$', description: '비밀번호', required: true })
  @Column()
  password: string;

  @ApiProperty({ example: '남자', description: '성별', required: true })
  @Column()
  gender: string;

  @ApiProperty({ example: 27, description: '나이', required: true })
  @Column()
  age: number;

  @ApiProperty({
    enum: Role,
    description: '사용자 등급',
    required: true,
  })
  @Column({ default: Role.CUSTOMER })
  role: Role;

  @ApiProperty({
    enum: Status,
    description: '활성 상태',
    required: true,
  })
  @Column({ default: Status.ACTIVE })
  status: Status;

  @ApiProperty({
    example: '2022-09-01T01:24:07.000Z',
    description: '계정 생성 날짜',
    required: true,
  })
  @CreateDateColumn()
  createAt: Date;

  @ApiProperty({
    example: '2022-09-01T01:24:07.000Z',
    description: '계정 비활성화 날짜',
    required: true,
  })
  @DeleteDateColumn()
  deleteAt: Date;
}
