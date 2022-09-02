import { FreeBoardEntity } from '../../freeBoard/entities/freeBoard.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.enum';
import { Status } from './status.enum';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  gender: string;

  @Column()
  age: number;

  @Column({ default: Role.CUSTOMER })
  role: Role;

  @Column({ default: Status.ACTIVE })
  status: Status;

  @CreateDateColumn()
  createAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  // 자유게시판 Relation
  @OneToMany(
    () => FreeBoardEntity,
    (freeBoard: FreeBoardEntity) => freeBoard.author,
  )
  freeBoards: FreeBoardEntity[];
}
