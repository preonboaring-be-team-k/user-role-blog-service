import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Notice } from '../entities/notice.entity';

export class NoticeInput extends PickType(Notice, [
  'title',
  'description'
]) {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: '제목',
  })
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: '본문',
  })
  readonly description: string;
}
