import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './api/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncModuleOptions } from './config/typeorm.config';
import { BoardModule } from './api/board/admin-board.module';
import { NoticeModule } from './api/notice/notice.module';
import { FreeBoardModule } from './api/freeBoard/freeBoard.module';

@Module({
  imports: [
    UserModule,
    BoardModule,
    NoticeModule,
    FreeBoardModule,
    TypeOrmModule.forRootAsync(typeOrmAsyncModuleOptions)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
