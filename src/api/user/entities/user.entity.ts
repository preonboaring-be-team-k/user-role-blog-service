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
}
