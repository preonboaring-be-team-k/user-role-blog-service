import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
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
}