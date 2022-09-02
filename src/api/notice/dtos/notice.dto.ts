import { ApiProperty } from '@nestjs/swagger';

export class NoticeInput {
  @ApiProperty({
    type: String,
    description: '제목',
  })
  readonly title: string;

  @ApiProperty({
    type: String,
    description: '본문',
  })
  readonly description: string;
}
