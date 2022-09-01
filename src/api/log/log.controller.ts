import {
  Controller,
  Get,
  Request
} from '@nestjs/common';
import {
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { SearchType, Sort, Status } from './entity/variables.util';
import { LogService } from './log.service';

@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}
  /**
   * description : [관리자] 의뢰자 리스트 조회 API
   * @param Non-exist
   * @returns GetRequestersResponse
   */
  @ApiHeader({
    description: 'jwt token',
    name: 'x-access-token',
    example: 'JWT TOKEN',
  })
  // @ApiResponse({
  //   status: 100,
  //   description: '성공',
  //   type: GetRequestersResponse,
  // })
  @ApiResponse({
    status: 200,
    description: '접근 불가능한 권한입니다.',
  })
  @ApiResponse({
    status: 400,
    description: '서버 에러',
  })
  @ApiQuery({ name: 'status', enum: Status, required: false })
  @ApiQuery({ name: 'sort', enum: Sort, required: false })
  @ApiQuery({ name: 'type', enum: SearchType, required: false })
  @ApiQuery({ name: 'keyword', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiOperation({ summary: '[관리자] 의뢰자 리스트 조회 API' })
  @Get()
  getLogs(@Request() req) {
    // @Headers('x-access-token') jwt, @Request() req
    // jwt 해독

    // 권한별 유저 접근 확인
    // if (
    //   !apiAuthorityCheck(payload.gridgeAuthority, [
    //     'Master',
    //     'Consultant',
    //     'PM',
    //   ])
    // ) {
    //   return response.CANNOT_ACCESS_BY_AUTHORITY;
    // }
    return this.logService.retrieveUsers(req);
  }
}
