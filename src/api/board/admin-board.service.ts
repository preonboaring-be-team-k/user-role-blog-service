import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { BoardResponseDto } from './dtos/boardResponse.dto';
import { CreateBoardDto } from './dtos/createBoard.dto';
import { UpdateBoardDto } from './dtos/updateBoard.dto';
import { AdminBoard } from './entities/admin-board.entity';

@Injectable()
export class AdminBoardService {
  constructor(
    @InjectRepository(AdminBoard)
    private adminBoardRepository: Repository<AdminBoard>,
    @InjectRepository(UserEntity)
    private userEntityRepository: Repository<UserEntity>,
  ) {}

  async createBoard(
    createBoardDto: CreateBoardDto,
    loginUser: number,
  ): Promise<number> {
    const user: UserEntity = await this.userEntityRepository.findOne({
      where: { id: loginUser },
    });

    if (!user) {
      throw new NotFoundException('존재하지 않은 회원입니다');
    }

    const board: AdminBoard = new AdminBoard(
      createBoardDto.title,
      createBoardDto.discription,
      user,
    );
    return (await this.adminBoardRepository.save(board)).id;
  }

  async retrieveBoards(): Promise<BoardResponseDto[]> {
    const boards: AdminBoard[] = await this.adminBoardRepository.find();
    return boards
      .filter((board) => !board.isDeleted)
      .map((board) => BoardResponseDto.of(board));
  }

  async retrieveBoard(id: number): Promise<BoardResponseDto> {
    const board: AdminBoard = await this.findById(id);
    return BoardResponseDto.of(board);
  }

  async editBoard(
    id: number,
    updateBoardDto: UpdateBoardDto,
    loginUser: number,
  ): Promise<BoardResponseDto> {
    const board: AdminBoard = await this.adminBoardRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (board.author.id !== loginUser) {
      throw new UnauthorizedException(
        '게시물 등록된 회원의 정보와 로그인정보가 불일치합니다.',
      );
    }

    const updateBoard = await this.adminBoardRepository.save(
      board.update(updateBoardDto),
    );
    return BoardResponseDto.of(updateBoard);
  }

  async removeBoard(id: number, loginUser: number) {
    const board: AdminBoard = await this.adminBoardRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (board.author.id !== loginUser) {
      throw new UnauthorizedException(
        '게시물 등록된 회원의 정보와 로그인정보가 불일치합니다.',
      );
    }

    board.delete();
    await this.adminBoardRepository.save(board);
    return {
      message: '성공적으로 삭제되었습니다.',
    };
  }

  private async findById(id: number) {
    const board: AdminBoard = await this.adminBoardRepository.findOne({
      where: { id },
    });
    if (!board || board.isDeleted) {
      throw new NotFoundException('존재하지 않은 게시물입니다.');
    }
    return board;
  }
}
