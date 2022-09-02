import { ApiProperty, OmitType } from '@nestjs/swagger';
import { FreeBoardEntity } from '../entities/freeBoard.entity';

export class FreeBoardDto extends OmitType(FreeBoardEntity, ['deleteAt']) {
  @ApiProperty({
    example: '작성자',
    required: true,
  })
  authorName: string;

  constructor(freeBoard: FreeBoardEntity) {
    super();
    this.id = freeBoard.id;
    this.title = freeBoard.title;
    this.description = freeBoard.description;
    this.createAt = freeBoard.createAt;
    this.authorName = freeBoard.author.name;
  }
}
