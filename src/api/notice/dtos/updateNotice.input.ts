import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { Notice } from "../entities/notice.entity";

export class UpdateNoticeInput extends PickType(Notice, [
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