import { Controller, Get, Request } from '@nestjs/common';
import {
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { GetLogsResponse } from './dto/getLogs.response';
import { Gender, SearchType, Sort, Status } from './entity/variables.util';
import { LogService } from './log.service';

@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}
  /**
   * description : 통계 조회 API
   * @query enum
   * @returns GetLogsResponse
   */
  @ApiHeader({
    description: 'jwt token',
    name: 'x-access-token',
    example: 'JWT TOKEN',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: GetLogsResponse,
  })
  @ApiResponse({
    status: 401,
    description: '접근 불가능한 권한입니다.',
  })
  @ApiResponse({
    status: 400,
    description: '잘못된 값입니다.',
  })
  @ApiResponse({
    status: 500,
    description: '서버 에러',
  })
  @ApiQuery({ name: 'status', enum: Status, required: false })
  @ApiQuery({ name: 'gender', enum: Gender, required: false })
  @ApiQuery({ name: 'age', required: false })
  @ApiQuery({ name: 'time', required: false })
  @ApiQuery({ name: 'sort', enum: Sort, required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiOperation({ summary: '통계 조회 API' })
  @Get()
  getLogs(@Request() req) {
    return this.logService.retrieveLogs(req);
  }
}
