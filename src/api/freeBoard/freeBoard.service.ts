import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { CreateFreeBoardDto } from './dtos/createFreeBoard.dto';
import { EditFreeBoardDto } from './dtos/editFreeBoard.dto';
import { FreeBoardDto } from './dtos/freeBoard.dto';
import { FreeBoardListDto } from './dtos/freeBoardList.dto';
import { FreeBoardEntity } from './entities/freeBoard.entity';

@Injectable()
export class FreeBoardService {
  constructor(
    @InjectRepository(FreeBoardEntity)
    private readonly freeBoardRepository: Repository<FreeBoardEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  /**
   * @param CreateFreeBoardDto
   *
   * @code writer 김현균
   * @description 자유게시판 생성 API
   *
   * @return FreeBoardDto
   */
  async createFreeBoard(
    createFreeBoardDto: CreateFreeBoardDto,
    userId: number,
  ) {
    // [x] User 정보 가져오기
    const user = await this.userRepository.findOneBy({
      id: userId,
    });

    const newFreeBoard = this.freeBoardRepository.create(createFreeBoardDto);
    newFreeBoard.author = user;

    await this.freeBoardRepository.save(newFreeBoard);
    return new FreeBoardDto(newFreeBoard);
  }

  /**
   * @code writer 김현균
   * @description 자유게시판 리스트 조회 API
   *
   * @returns [FreeBoardListDto]
   */
  async getFreeBoards() {
    const freeBoards = await this.freeBoardRepository.find();
    return freeBoards.map((freeBoard) => new FreeBoardListDto(freeBoard));
  }

  /**
   * @param id number
   *
   * @code writer 김현균
   * @description 자유게시판 조회 API
   *
   * @returns FreeBoardDto
   */
  async getFreeBoardById(id: number) {
    const freeBoard = await this.freeBoardRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!freeBoard) throw new HttpException('Not found', 404);

    return new FreeBoardDto(freeBoard);
  }

  /**
   * @param id number
   * @param EditFreeBoardDto
   *
   * @code writer 김현균
   * @description 자유게시판 수정 API
   *
   * @return FreeBoardDto
   */
  async editFreeBoardById(
    id: number,
    editFreeBoardDto: EditFreeBoardDto,
    userId: number,
  ) {
    const freeBoard = await this.freeBoardRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    // [x] Not found 예외처리
    if (!freeBoard) throw new HttpException('Not found', 404);

    if (freeBoard.author.id !== userId) {
      throw new HttpException('접근할 수 없습니다.', HttpStatus.UNAUTHORIZED);
    }

    // [x] dto가 아예 비어있으면 성공으로 반환
    if (editFreeBoardDto.title) freeBoard.title = editFreeBoardDto.title;
    if (editFreeBoardDto.description)
      freeBoard.description = editFreeBoardDto.description;

    freeBoard.save();

    return new FreeBoardDto(freeBoard);
  }

  /**
   * @param id number
   *
   * @code writer 김현균
   * @description 자유게시판 삭제 API
   */
  async deleteFreeBoardById(id: number, userId: number) {
    const freeBoard = await this.freeBoardRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    // [x] Not found 예외처리
    if (!freeBoard) throw new HttpException('Not found', 404);

    if (freeBoard.author.id !== userId) {
      throw new HttpException('접근할 수 없습니다.', HttpStatus.UNAUTHORIZED);
    }

    await this.freeBoardRepository.softDelete({ id });
  }
}
