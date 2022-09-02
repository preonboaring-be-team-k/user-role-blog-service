import { ApiProperty } from '@nestjs/swagger';
import { AdminBoard } from '../entities/admin-board.entity';

export class BoardResponseDto {
  @ApiProperty({
    example: 1,
    description: '게시물의 등록 아이디입니다.',
  })
  id: number;

  @ApiProperty({
    example: '이번 달 계획표.',
    description: '게시물의 제목입니다.',
  })
  title: string;

  @ApiProperty({
    example: '계획이 이렇게....',
    description: '게시물의 내용입니다.',
  })
  discription: string;

  @ApiProperty({
    example: '2022-09-01T09:35:02.000Z',
    description: '게시물의 등록날짜입니다..',
  })
  createAt: Date;

  @ApiProperty({
    example: '2022-09-01T09:35:02.000Z',
    description: '수정날짜입니다',
  })
  updateAt: Date;

  constructor(
    id: number,
    title: string,
    discription: string,
    createAt: Date,
    updateAt: Date,
  ) {
    this.id = id;
    this.title = title;
    this.discription = discription;
    this.createAt = createAt;
    this.updateAt = updateAt;
  }

  static of(board: AdminBoard): BoardResponseDto {
    return new BoardResponseDto(
      board.id,
      board.title,
      board.discription,
      board.createAt,
      board.updateAt,
    );
  }
}
