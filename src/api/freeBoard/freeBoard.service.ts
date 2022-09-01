import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFreeBoardDto } from './dtos/createFreeBoard.dto';
import { FreeBoardEntity } from './entities/freeBoard.entity';

@Injectable()
export class FreeBoardService {
  constructor(
    @InjectRepository(FreeBoardEntity)
    private readonly freeBoardRepository: Repository<FreeBoardEntity>,
  ) {}

  /**
   * @param CreateFreeBoardDto
   *
   * @code writer 김현균
   * @description 자유게시판 생성 API
   *
   * @returns null
   */
  async createFreeBoard(createFreeBoardDto: CreateFreeBoardDto) {
    const newFreeBoard = this.freeBoardRepository.create(createFreeBoardDto);
    await this.freeBoardRepository.save(newFreeBoard);
  }
}
