import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateFreeBoardDto } from './dtos/createFreeBoard.dto';
import { FreeBoardService } from './freeBoard.service';

@Controller('free-board')
export class FreeBoardController {
  constructor(private readonly freeBoardService: FreeBoardService) {}

  /**
   * @code writer 김현균
   * @description 자유게시판 생성 API
   *
   * @POST ("/free-board")
   *
   * @returns null
   */
  @Post()
  async createFreeBoard(@Body() createFreeBoardDto: CreateFreeBoardDto) {
    return this.freeBoardService.createFreeBoard(createFreeBoardDto);
  }

  /**
   * @code writer 김현균
   * @description 자유게시판 리스트 조회 API
   *
   * @GET ("/free-board")
   *
   * @returns json
   */
  @Get()
  async getFreeBoards() {
    return this.freeBoardService.getFreeBoards();
  }
}
