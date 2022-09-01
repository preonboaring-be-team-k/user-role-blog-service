import { Body, Controller, Post } from '@nestjs/common';
import { CreateFreeBoardDto } from './dtos/createFreeBoard.dto';
import { FreeBoardService } from './freeBoard.service';

@Controller('free-board')
export class FreeBoardController {
  constructor(private readonly freeBoardService: FreeBoardService) {}

  @Post()
  async createFreeBoard(@Body() createFreeBoardDto: CreateFreeBoardDto) {
    return this.freeBoardService.createFreeBoard(createFreeBoardDto);
  }
}
