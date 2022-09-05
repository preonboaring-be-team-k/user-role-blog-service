import { UserEntity } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UpdateBoardDto } from '../dtos/updateBoard.dto';

@Entity()
export class AdminBoard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  discription: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt?: Date;

  @DeleteDateColumn()
  deleteAt?: Date | null;

  @Column()
  isDeleted: boolean;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.adminboards)
  @JoinColumn({
    name: 'user_id',
  })
  author: UserEntity;

  constructor(title: string, discription: string, user: UserEntity) {
    this.title = title;
    this.discription = discription;
    this.author = user;
    this.isDeleted = false;
  }

  public update(updateBoardDto: UpdateBoardDto): AdminBoard {
    this.title = updateBoardDto.title;
    this.discription = updateBoardDto.discription;
    return this;
  }

  public delete(): void {
    this.isDeleted = true;
    this.recordDeleteTime();
  }

  recordDeleteTime() {
    this.deleteAt = new Date();
  }
}
