import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notice } from './entities/notice.entity';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,
  ) {}

  async create(input) {
    return await this.noticeRepository.save({
      ...input,
      // user: id
    });
  }

  async update(id, input) {
    const PREV = await this.noticeRepository.findOneBy({ id });
    return await this.noticeRepository.save({
      ...PREV,
      ...input,
    });
  }

  async delete(id) {
    try {
      await this.noticeRepository.delete({ id });
      return '게시글 삭제';
    } catch (error) {
      throw error;
    }
  }

  async find() {
    return await this.noticeRepository.find();
  }

  async findOne(id) {
    return await this.noticeRepository.findOneBy({ id });
  }
}
