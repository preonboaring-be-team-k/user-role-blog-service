import { Test, TestingModule } from '@nestjs/testing';
import { FreeBoardController } from './freeBoard.controller';

describe('FreeBoardController', () => {
  let controller: FreeBoardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FreeBoardController],
    }).compile();

    controller = module.get<FreeBoardController>(FreeBoardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
