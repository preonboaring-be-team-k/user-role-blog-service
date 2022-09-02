import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { FreeBoardAPIDocs } from './docs/freeBoard.docs';
import { CreateFreeBoardDto } from './dtos/createFreeBoard.dto';
import { EditFreeBoardDto } from './dtos/editFreeBoard.dto';
import { FreeBoardService } from './freeBoard.service';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('Access Token')
@ApiTags('자유게시판')
@Controller('free-board')
export class FreeBoardController {
  constructor(private readonly freeBoardService: FreeBoardService) {}

  /**
   * @code writer 김현균
   * @description 자유게시판 생성 API
   *
   * @POST ("/free-board")
   *
   * @returns json
   */
  @Post()
  @ApiOperation(FreeBoardAPIDocs.CreateOperation())
  @ApiCreatedResponse(FreeBoardAPIDocs.CreateCreatedResponse())
  @ApiBadRequestResponse(FreeBoardAPIDocs.BadRequestResponse())
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
  @ApiOperation(FreeBoardAPIDocs.GetListOperation())
  @ApiOkResponse(FreeBoardAPIDocs.GetListOkResponse())
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
  @ApiOperation(FreeBoardAPIDocs.GetByIdOperation())
  @ApiOkResponse(FreeBoardAPIDocs.GetByIdOkResponse())
  @ApiNotFoundResponse(FreeBoardAPIDocs.NotFoundResponse())
  async getFreeBoardById(@Param('id', ParseIntPipe) id: number) {
    return this.freeBoardService.getFreeBoardById(id);
  }

  /**
   * @code writer 김현균
   * @description 자유게시판 수정 API
   *
   * @PATCH ("/free-board/1")
   *
   * @returns json
   */
  @Patch(':id')
  @ApiOperation(FreeBoardAPIDocs.EditOperation())
  @ApiOkResponse(FreeBoardAPIDocs.EditOkResponse())
  @ApiNotFoundResponse(FreeBoardAPIDocs.NotFoundResponse())
  async editFreeBoardById(
    @Param('id', ParseIntPipe) id: number,
    @Body() editFreeBoardDto: EditFreeBoardDto,
  ) {
    return this.freeBoardService.editFreeBoardById(id, editFreeBoardDto);
  }

  /**
   * @code writer 김현균
   * @description 자유게시판 삭제 API
   *
   * @DELETE ("/free-board/1")
   */
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation(FreeBoardAPIDocs.DeleteByIdOperation())
  @ApiNoContentResponse(FreeBoardAPIDocs.NoContentResponse())
  @ApiNotFoundResponse(FreeBoardAPIDocs.NotFoundResponse())
  async deleteFreeBoardById(@Param('id', ParseIntPipe) id: number) {
    return this.freeBoardService.deleteFreeBoardById(id);
  }
}
