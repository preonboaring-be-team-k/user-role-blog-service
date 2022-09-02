import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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

  constructor(title: string, discription: string) {
    this.title = title;
    this.discription = discription;
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
