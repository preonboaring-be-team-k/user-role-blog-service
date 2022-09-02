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
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './api/auth/guard/role.guard';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET_KEY: Joi.string().required(),
        JWT_EXPIRESIN: Joi.number().required(),
      }),
    }),
    UserModule,
    BoardModule,
    NoticeModule,
    FreeBoardModule,
    AuthModule,
    TypeOrmModule.forRootAsync(typeOrmAsyncModuleOptions),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
