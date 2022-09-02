import { Test, TestingModule } from '@nestjs/testing';
import { FreeBoardService } from './free-board.service';

describe('FreeBoardService', () => {
  let service: FreeBoardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FreeBoardService],
    }).compile();

    service = module.get<FreeBoardService>(FreeBoardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
