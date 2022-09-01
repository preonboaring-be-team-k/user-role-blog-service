import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateFreeBoardDto } from './dtos/createFreeBoard.dto';
import { EditFreeBoardDto } from './dtos/editFreeBoard.dto';
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

  /**
   * @code writer 김현균
   * @description 자유게시판 조회 API
   *
   * @GET ("/free-board/1")
   *
   * @returns json
   */
  @Get(':id')
  async getFreeBoardById(@Param('id', ParseIntPipe) id: number) {
    return this.freeBoardService.getFreeBoardById(id);
  }

  /**
   * @code writer 김현균
   * @description 자유게시판 수정 API
   *
   * @PATCH ("/free-board/1")
   */
  @Patch(':id')
  async editFreeBoardById(
    @Param('id', ParseIntPipe) id: number,
    @Body() editFreeBoardDto: EditFreeBoardDto,
  ) {
    return this.freeBoardService.editFreeBoardById(id, editFreeBoardDto);
  }
}
