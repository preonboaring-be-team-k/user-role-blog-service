import { ApiProperty } from '@nestjs/swagger';

class BaseResponseDto {
  @ApiProperty({})
  success: boolean;

  @ApiProperty({})
  timestamp: Date;

  @ApiProperty({})
  message: string;
}

class BaseExceptionDto {
  @ApiProperty({
    example: false,
  })
  success: boolean;

  @ApiProperty({})
  timestamp: Date;

  @ApiProperty({})
  message: string;
}

export function createResponseDto(dto: object, isArray = false) {
  class ResponseOne extends BaseResponseDto {
    @ApiProperty({
      type: dto,
    })
    data: object;
  }

  class ResponseList extends BaseResponseDto {
    @ApiProperty({
      type: dto,
      isArray: true,
    })
    data: object;
  }

  return !isArray ? ResponseOne : ResponseList;
}

export function createExceptionDto(type: object, isArray = false) {
  class ExceptionOne extends BaseExceptionDto {
    @ApiProperty({
      type,
    })
    data: any;
  }

  class ExceptionList extends BaseExceptionDto {
    @ApiProperty({
      type,
      isArray: true,
    })
    data: any;
  }

  return !isArray ? ExceptionOne : ExceptionList;
}
