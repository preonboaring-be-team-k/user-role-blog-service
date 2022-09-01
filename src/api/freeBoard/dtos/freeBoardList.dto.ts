import { PickType } from '@nestjs/swagger';
import { FreeBoardEntity } from '../entities/freeBoard.entity';

export class FreeBoardListDto extends PickType(FreeBoardEntity, [
  'id',
  'title',
  'createAt',
]) {
  constructor(freeBoard: FreeBoardEntity) {
    super();
    this.id = freeBoard.id;
    this.title = freeBoard.title;
    this.createAt = freeBoard.createAt;
  }
}
