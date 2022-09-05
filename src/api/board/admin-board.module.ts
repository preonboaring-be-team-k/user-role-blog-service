import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminBoardController } from './admin-board.controller';
import { AdminBoardService } from './admin-board.service';
import { AdminBoard } from './entities/admin-board.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminBoard]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AdminBoardController],
  providers: [AdminBoardService, JwtService],
})
export class BoardModule {}
