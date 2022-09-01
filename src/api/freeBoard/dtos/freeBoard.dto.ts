import { OmitType } from '@nestjs/swagger';
import { FreeBoardEntity } from '../entities/freeBoard.entity';

export class FreeBoardDto extends OmitType(FreeBoardEntity, ['deleteAt']) {
  constructor(freeBoard: FreeBoardEntity) {
    super();
    this.id = freeBoard.id;
    this.title = freeBoard.title;
    this.description = freeBoard.description;
    this.createAt = freeBoard.createAt;
  }
}
