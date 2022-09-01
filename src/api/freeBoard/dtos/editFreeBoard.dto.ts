import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { FreeBoardEntity } from '../entities/freeBoard.entity';

export class EditFreeBoardDto extends PickType(FreeBoardEntity, [
  'title',
  'description',
]) {
  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  description: string;
}
