import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './api/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncModuleOptions } from './config/typeorm.config';

@Module({
  imports: [UserModule, TypeOrmModule.forRootAsync(typeOrmAsyncModuleOptions)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
