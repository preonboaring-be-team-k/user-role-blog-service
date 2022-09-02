import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBoardDto {
  @ApiProperty({
    example: '웨인힐스벤처스의 운영계획입니다.',
    description: '게시물 제목',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: '웨인힐스벤처스의 운영계획은 ~~~~!!! .',
    description: '게시물 내용',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  discription: string;
  // role

  constructor(title: string, discription: string) {
    this.title = title;
    this.discription = discription;
  }
}
