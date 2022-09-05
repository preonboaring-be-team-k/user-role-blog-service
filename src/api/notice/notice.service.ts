import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICurrentUser } from '../user/decorator/user.decorator';
import { NoticeInput } from './dtos/notice.dto';
import { Notice } from './entities/notice.entity';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,
  ) {}

    async create(input: NoticeInput, userId){
      return await this.noticeRepository.save({
          ...input,
          user: userId
      })
    }

    async update(id: number, input: NoticeInput, userId: number){
      const PREV = await this.noticeRepository.findOneBy({id})
      if(PREV) {
        if(PREV.user.id !== userId){
          throw new HttpException('수정은 작성자만 가능합니다.', 422)
        }
        return await this.noticeRepository.save({
          ...PREV,
          ...input
        })
      } else {
        throw new HttpException('', 204)
      }
    }

    async delete(id: number, userId){
      const TARGET = await this.noticeRepository.findOneBy({id})
      if(TARGET.user.id !== userId){
        throw new HttpException('삭제는 작성자만 가능합니다.', 422)
      }        
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
