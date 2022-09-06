import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { NoticeInput } from './dtos/createNotice.input';
import { NoticeDto } from './dtos/notice.dto';
import { NoticeListDto } from './dtos/noticeList.dto';
import { UpdateNoticeInput } from './dtos/updateNotice.input';
import { Notice } from './entities/notice.entity';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

    async create(input: NoticeInput, userId){
      const RESULT =  await this.noticeRepository.save({
          ...input,
          user: userId
      })
      const USER = await this.userRepository.findOneBy({id: userId})
      RESULT.user = USER
      
      return new NoticeDto(RESULT)
    }

    async update(id: number, input: UpdateNoticeInput, userId: number){
      const PREV = await this.noticeRepository.findOneBy({id})
      if(PREV) {
        if(PREV.user.id !== userId){
          throw new HttpException('수정은 작성자만 가능합니다.', 422)
        }
        const RESULT =  await this.noticeRepository.save({
          ...PREV,
          ...input
        })

        return new NoticeDto(RESULT)
      } else {
        throw new HttpException('', 204)
      }
    }

    async delete(id: number, userId: number){
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
      const RESULT = await this.noticeRepository.find()
      return RESULT.map((e) => new NoticeListDto(e))
    }

    async findOne(id: number){
      const RESULT = await this.noticeRepository.findOneBy({id})
      if(RESULT) {
        return new NoticeDto(RESULT)
      } else {
        throw new HttpException('', 204)
      }
    }
}
