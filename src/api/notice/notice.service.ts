import { HttpCode, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notice } from './entities/notice.entity';

@Injectable()
export class NoticeService {
    constructor(
        @InjectRepository(Notice)
        private readonly noticeRepository: Repository<Notice>,
    ){}

    async create(input){
      return await this.noticeRepository.save({
          ...input,
          // user: id
      })
    }

    async update(id, input){
      const PREV = await this.noticeRepository.findOneBy({id})
      if(PREV) {
        return await this.noticeRepository.save({
          ...PREV,
          ...input
        })
      } else {
        throw new HttpException('', 204)
      }
    }

    async delete(id){        
      const RESULT = await this.noticeRepository.delete({id})
      if(RESULT.affected) {
        return '게시글 삭제'
      } else {
        throw new HttpException('', 204)
      }
    }

    async find(){
      return await this.noticeRepository.find()
    }

    async findOne(id){
      const RESULT = await this.noticeRepository.findOneBy({id})
      if(RESULT) {
        return RESULT
      } else {
        throw new HttpException('', 204)
      }
    }
}
