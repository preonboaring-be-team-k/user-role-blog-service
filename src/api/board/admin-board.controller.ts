import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminBoardService } from './admin-board.service';
import { BoardResponseDto } from './dtos/boardResponse.dto';
import { CreateBoardDto } from './dtos/createBoard.dto';
import { UpdateBoardDto } from './dtos/updateBoard.dto';

@Controller('admin/board')
@ApiTags('운영진 게시판 API')
export class AdminBoardController {
  constructor(private adminBoardService: AdminBoardService) {}

  @Post()
  @ApiOperation({
    summary: '운영진 게시물 등록 API',
    description: '운영진이 게시물을 등록한다.',
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: Number,
  })
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<number> {
    return this.adminBoardService.createBoard(createBoardDto);
  }

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
  ): Promise<BoardResponseDto> {
    return this.adminBoardService.editBoard(id, updateBoardDto);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: '운영진 게시물 삭제 API',
    description: '운영진이 게시물을 삭제한다.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  deleteBoard(@Param('id') id: number) {
    return this.adminBoardService.removeBoard(id);
  }
}
