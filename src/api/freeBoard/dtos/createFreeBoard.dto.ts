import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { FreeBoardEntity } from '../entities/freeBoard.entity';

export class CreateFreeBoardDto extends PickType(FreeBoardEntity, [
  'title',
  'description',
]) {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  // JWT Token으로 적용 전 임시로 적용
  @ApiProperty({
    example: 1,
    description: '작성자 userId',
    required: true,
  })
  @IsNumber()
  userId: number;
}
