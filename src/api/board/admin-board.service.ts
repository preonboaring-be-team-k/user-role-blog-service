import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BoardResponseDto } from "./dtos/boardResponse.dto";
import { CreateBoardDto } from "./dtos/createBoard.dto";
import { AdminBoard } from "./entities/admin-board.entity";

@Injectable()
export class AdminBoardService {
    constructor(
        @InjectRepository(AdminBoard)
        private adminBoardRepository: Repository<AdminBoard>
    ) {}

    async createBoard(createBoardDto: CreateBoardDto): Promise<number> {
        const board: AdminBoard = new AdminBoard(createBoardDto.title, createBoardDto.discription);
        return (await this.adminBoardRepository.save(board)).id;
    }

    async retrieveBoards(): Promise<BoardResponseDto[]> {
        const boards: AdminBoard[] = await this.adminBoardRepository.find();
        return boards.filter(board => !board.isDeleted)
            .map(board => BoardResponseDto.of(board));
    }
}