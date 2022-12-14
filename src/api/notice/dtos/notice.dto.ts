import { ApiProperty } from "@nestjs/swagger";
import { Notice } from "../entities/notice.entity";

export class NoticeDto extends Notice {
  @ApiProperty({
    example: '작성자',
    required: true,
  })
  authorName: string

  constructor(notice: Notice) {
    super()
    this.id = notice.id;
    this.title = notice.title;
    this.description = notice.description;
    this.createAt = notice.createAt;
    this.authorName = notice.user.name
  }
}