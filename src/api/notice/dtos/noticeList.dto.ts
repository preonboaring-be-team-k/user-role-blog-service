import { ApiProperty, PickType } from "@nestjs/swagger";
import { Notice } from "../entities/notice.entity";

export class NoticeListDto extends PickType(Notice, [
  'id',
  'title',
  'createAt',
]) {
  @ApiProperty({
    example: '작성자',
    required: true,
  })
  authorName: string

  constructor(notice: Notice) {
    super();
    this.id = notice.id;
    this.title = notice.title;
    this.createAt = notice.createAt;
    this.authorName = notice.user.name
  }
}