import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BoardResponseDto } from "./dtos/boardResponse.dto";
import { CreateBoardDto } from "./dtos/createBoard.dto";
import { UpdateBoardDto } from "./dtos/updateBoard.dto";
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

    async retrieveBoard(id: number): Promise<BoardResponseDto> {
        const board: AdminBoard = await this.adminBoardRepository.findOne({
            where: { id }
        });
        if (!board || board.isDeleted) {
            throw new NotFoundException('존재하지 않은 게시물입니다.');
        }

        return BoardResponseDto.of(board);
    }

    async editBoard(id:number,updateBoardDto: UpdateBoardDto) {
        const board: AdminBoard = await this.adminBoardRepository.findOne({
            where: { id }
        });
        if (!board || board.isDeleted) {
            throw new NotFoundException('존재하지 않은 게시물입니다.');
        }
       
        return await this.adminBoardRepository.save(board.update(updateBoardDto));
    }

    async removeBoard(id: number) {
        const board: AdminBoard = await this.adminBoardRepository.findOne({
            where: { id }
        });

        board.delete();
        return await this.adminBoardRepository.save(board);
    }
}