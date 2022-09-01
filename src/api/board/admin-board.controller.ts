import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { AdminBoardService } from "./admin-board.service";
import { BoardResponseDto } from "./dtos/boardResponse.dto";
import { CreateBoardDto } from "./dtos/createBoard.dto";
import { UpdateBoardDto } from "./dtos/updateBoard.dto";

@Controller('board')
export class AdminBoardController {
    constructor(
        private adminBoardService: AdminBoardService
    ) { }

    @Post()
    createBoard(@Body() createBoardDto: CreateBoardDto): Promise<number> {
        return this.adminBoardService.createBoard(createBoardDto);
    }

    @Get()
    getBoards(): Promise<BoardResponseDto[]> {
        return this.adminBoardService.retrieveBoards();
    }

    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise<BoardResponseDto> {
        return this.adminBoardService.retrieveBoard(id);
    }

    @Put('/:id')
    updateBoard(@Param('id') id: number, @Body() updateBoardDto: UpdateBoardDto): Promise<BoardResponseDto> {
        return this.adminBoardService.editBoard(id, updateBoardDto);
    }

    @Delete('/:id')
    deleteBoard(@Param('id') id: number) {
        return this.adminBoardService.removeBoard(id);
    }
}