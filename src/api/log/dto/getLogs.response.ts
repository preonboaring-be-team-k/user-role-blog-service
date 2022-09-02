import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { BaseResponse } from '../../../config/base.response';

class GetLogsResultData {
  @ApiProperty({
    example: '1',
    description: 'userId',
    required: true,
  })
  @IsString()
  id: number;

  @ApiProperty({
    example: '박규성',
    description: 'name',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '2022-08-11',
    description: '날짜',
    required: true,
  })
  @IsNumber()
  createdAt: string;

  @ApiProperty({
    example: 'ACTIVE',
    description: '상태',
    required: true,
  })
  @IsNumber()
  status: string;

  @ApiProperty({
    example: 'MAN',
    description: 'gender',
    required: true,
  })
  @IsNumber()
  gender: string;

  @ApiProperty({
    example: 'customer',
    description: 'role',
    required: true,
  })
  @IsNumber()
  role: string;

  @ApiProperty({
    example: '17',
    description: 'age',
    required: true,
  })
  @IsNumber()
  age: string;
}

export abstract class GetLogsResponse extends BaseResponse {
  @ApiProperty({
    description: 'result 객체',
    required: true,
  })
  @IsArray()
  result: GetLogsResultData;
}
