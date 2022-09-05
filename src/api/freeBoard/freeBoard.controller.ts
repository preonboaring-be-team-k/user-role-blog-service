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
import { CommonResponse } from '../../common/responses/common.response';
import { JWTAuthGuard } from '../auth/guard/jwt.auth.guard';
import { ICurrentUser, User } from '../user/decorator/user.decorator';
import { FreeBoardAPIDocs } from './docs/freeBoard.docs';
import { CreateFreeBoardDto } from './dtos/createFreeBoard.dto';
import { EditFreeBoardDto } from './dtos/editFreeBoard.dto';
import { FreeBoardService } from './freeBoard.service';

@UseGuards(JWTAuthGuard)
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
  @ApiBadRequestResponse(CommonResponse.BadRequestResponse())
  async createFreeBoard(
    @Body() createFreeBoardDto: CreateFreeBoardDto,
    @User() currentUser: ICurrentUser,
  ) {
    return this.freeBoardService.createFreeBoard(
      createFreeBoardDto,
      currentUser.sub,
    );
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
  @ApiNotFoundResponse(CommonResponse.NotFoundResponse())
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
  @ApiNotFoundResponse(CommonResponse.NotFoundResponse())
  async editFreeBoardById(
    @Param('id', ParseIntPipe) id: number,
    @Body() editFreeBoardDto: EditFreeBoardDto,
    @User() currentUser: ICurrentUser,
  ) {
    return this.freeBoardService.editFreeBoardById(
      id,
      editFreeBoardDto,
      currentUser.sub,
    );
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
  @ApiNoContentResponse(CommonResponse.NoContentResponse())
  @ApiNotFoundResponse(CommonResponse.NotFoundResponse())
  async deleteFreeBoardById(
    @Param('id', ParseIntPipe) id: number,
    @User() currentUser: ICurrentUser,
  ) {
    return this.freeBoardService.deleteFreeBoardById(id, currentUser.sub);
  }
}
