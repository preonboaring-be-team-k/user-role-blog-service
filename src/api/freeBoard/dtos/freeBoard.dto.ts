import { FreeBoardEntity } from '../entities/freeBoard.entity';

export class FreeBoardDto {
  id: number;

  title: string;

  description: string;

  createAt: Date;

  constructor(freeBoard: FreeBoardEntity) {
    this.id = freeBoard.id;
    this.title = freeBoard.title;
    this.description = freeBoard.description;
    this.createAt = freeBoard.createAt;
  }
}
