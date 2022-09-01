import { Body, Controller, Post } from "@nestjs/common";
import { AdminBoardService } from "./admin-board.service";
import { CreateBoardDto } from "./dtos/createBoard.dto";

@Controller('board')
export class AdminBoardController {
    constructor(
        private adminBoardService: AdminBoardService
    ) { }

    @Post()
    createBoard(@Body() createBoardDto: CreateBoardDto): Promise<number> {
        return this.adminBoardService.createBoard(createBoardDto);
    }
}