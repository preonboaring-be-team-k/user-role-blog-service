import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './api/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncModuleOptions } from './config/typeorm.config';
import { BoardModule } from './api/board/admin-board.module';
import { NoticeModule } from './api/notice/notice.module';
import { FreeBoardModule } from './api/freeBoard/freeBoard.module';
import { AuthModule } from './api/auth/auth.module';

@Module({
  imports: [
    
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true,
    }),
    UserModule,
    BoardModule,
    NoticeModule,
    FreeBoardModule,
   
    AuthModule,
    TypeOrmModule.forRootAsync(typeOrmAsyncModuleOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
