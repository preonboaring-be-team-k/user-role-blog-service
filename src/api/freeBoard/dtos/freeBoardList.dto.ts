import { FreeBoardEntity } from '../entities/freeBoard.entity';

export class FreeBoardListDto {
  id: number;

  title: string;

  createAt: Date;

  constructor(freeBoard: FreeBoardEntity) {
    this.id = freeBoard.id;
    this.title = freeBoard.title;
    this.createAt = freeBoard.createAt;
  }
}
