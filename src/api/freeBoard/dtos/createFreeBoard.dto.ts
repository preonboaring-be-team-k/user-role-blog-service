import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
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
}
