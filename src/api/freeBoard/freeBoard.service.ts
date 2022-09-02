import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
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
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * @param CreateFreeBoardDto
   *
   * @code writer 김현균
   * @description 자유게시판 생성 API
   *
   * @return FreeBoardDto
   */
  async createFreeBoard(createFreeBoardDto: CreateFreeBoardDto) {
    // [x] User 정보 가져오기
    const user = await this.userRepository.findOneBy({
      id: createFreeBoardDto.userId,
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
    const count = await this.freeBoardRepository.countBy({ id });
    if (count < 1) {
      throw new HttpException('Not found', 404);
    }

    // const freeBoard = await this.freeBoardRepository.findOneBy({ id });
    const freeBoard = await this.freeBoardRepository.findOne({
      where: { id },
      relations: ['author'],
    });
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
  async editFreeBoardById(id: number, editFreeBoardDto: EditFreeBoardDto) {
    // [x] Not found 예외처리
    const count = await this.freeBoardRepository.countBy({ id });
    if (count < 1) {
      throw new HttpException('Not found', 404);
    }

    // [x] dto가 아예 비어있으면 성공으로 반환
    if (editFreeBoardDto.title || editFreeBoardDto.description) {
      await this.freeBoardRepository.update({ id }, editFreeBoardDto);
    }
    const freeBoard = await this.freeBoardRepository.findOneBy({ id });
    return new FreeBoardDto(freeBoard);
  }

  /**
   * @param id number
   *
   * @code writer 김현균
   * @description 자유게시판 삭제 API
   */
  async deleteFreeBoardById(id: number) {
    // [x] Not found 예외처리
    const count = await this.freeBoardRepository.countBy({ id });
    if (count < 1) {
      throw new HttpException('Not found', 404);
    }

    await this.freeBoardRepository.softDelete({ id });
  }
}
