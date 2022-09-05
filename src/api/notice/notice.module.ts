import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Notice } from './entities/notice.entity';
import { NoticeController } from './notice.controller';
import { NoticeService } from './notice.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Notice, UserEntity]),
  ],
  controllers: [NoticeController],
  providers: [NoticeService]
})
export class NoticeModule {}
