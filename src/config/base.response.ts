import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

// 기본적인 response 구조
export abstract class BaseResponse {
  @ApiProperty({
    example: true,
    description: 'API 성공 여부',
    required: true,
  })
  @IsBoolean()
  isSuccess: boolean;

  @ApiProperty({
    example: 1000,
    description: '코드 번호',
    required: true,
  })
  @IsNumber()
  code: number;

  @ApiProperty({
    example: '성공',
    description: 'API 성공 메시지',
    required: true,
  })
  @IsString()
  message: string;
}
