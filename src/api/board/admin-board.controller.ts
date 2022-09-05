import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../auth/decorator/roles.decorator';
import { JWTAuthGuard } from '../auth/guard/jwt.auth.guard';
import { User } from '../user/decorator/user.decorator';
import { Role } from '../user/entities/role.enum';
import { AdminBoardService } from './admin-board.service';
import { BoardResponseDto } from './dtos/boardResponse.dto';
import { CreateBoardDto } from './dtos/createBoard.dto';
import { UpdateBoardDto } from './dtos/updateBoard.dto';

@UseGuards(JWTAuthGuard)
@Roles(Role.ADMIN)
@ApiBearerAuth('Access Token')
@Controller('admin/board')
@ApiTags('운영진 게시판 API')
export class AdminBoardController {
  constructor(private adminBoardService: AdminBoardService) {}

  /**
   * @description 운영진 게시물 등록 API
   * @param createBoardDto 게시물 등록 dto
   * @returns 게시물 등록 번호
   */
  @Post()
  @ApiOperation({
    summary: '운영진 게시물 등록 API',
    description: '운영진이 게시물을 등록한다.',
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: Number,
  })
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @Req() req,
  ): Promise<number> {
    return this.adminBoardService.createBoard(createBoardDto, req.user.sub);
  }

  /**
   * @description 운영진 전체 게시물 조회
   * @returns 운영진 전체 게시물
   */
  @Get()
  @ApiOperation({
    summary: '운영진 전체 게시물 조회 API',
    description: '운영진이 전체 게시물을 조회한다.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [BoardResponseDto],
  })
  getBoards(): Promise<BoardResponseDto[]> {
    return this.adminBoardService.retrieveBoards();
  }

  /**
   * @description 운영진이 게시물을 조회
   * @param id 게시물 번호
   * @returns 게시물 상세정보
   */
  @Get('/:id')
  @ApiOperation({
    summary: '운영진 게시물 조회 API',
    description: '운영진이 게시물을 조회한다.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: BoardResponseDto,
  })
  getBoardById(@Param('id') id: number): Promise<BoardResponseDto> {
    return this.adminBoardService.retrieveBoard(id);
  }

  /**
   *
   * @param id 게시물번호
   * @param updateBoardDto 업데이트할게시물의 정보
   * @returns 수정완료 후 게시물의정보
   */
  @Put('/:id')
  @ApiOperation({
    summary: '운영진 게시물 수정 API',
    description: '운영진이 게시물을 수정한다.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: BoardResponseDto,
  })
  updateBoard(
    @Param('id') id: number,
    @Body() updateBoardDto: UpdateBoardDto,
    @Req() req,
  ): Promise<BoardResponseDto> {
    return this.adminBoardService.editBoard(id, updateBoardDto, req.user.sub);
  }

  /**
   *
   * @param id 게시물번호
   * @returns 게시물 삭제 메시지
   */
  @Delete('/:id')
  @ApiOperation({
    summary: '운영진 게시물 삭제 API',
    description: '운영진이 게시물을 삭제한다.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  deleteBoard(@Param('id') id: number, @Req() req) {
    return this.adminBoardService.removeBoard(id, req.user.sub);
  }
}
