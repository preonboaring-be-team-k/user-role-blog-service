import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FreeBoardEntity } from './entities/freeBoard.entity';
import { FreeBoardController } from './freeBoard.controller';
import { FreeBoardService } from './freeBoard.service';

@Module({
  imports: [TypeOrmModule.forFeature([FreeBoardEntity])],
  controllers: [FreeBoardController],
  providers: [FreeBoardService],
})
export class FreeBoardModule {}
