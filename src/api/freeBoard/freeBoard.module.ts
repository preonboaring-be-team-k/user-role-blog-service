import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { FreeBoardEntity } from './entities/freeBoard.entity';
import { FreeBoardController } from './freeBoard.controller';
import { FreeBoardService } from './freeBoard.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FreeBoardEntity, UserEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [FreeBoardController],
  providers: [FreeBoardService, JwtService],
})
export class FreeBoardModule {}
