import { AdminBoard } from "../entities/admin-board.entity";

export class BoardResponseDto {

    id: number;
    title: string;
    discription: string;

    constructor(id: number, title: string,discription: string) {
        this.id = id;
        this.title = title;
    }

    static of(board:AdminBoard):BoardResponseDto {
        return new BoardResponseDto(board.id, board.title, board.discription); 
    }
}