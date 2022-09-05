import { Test, TestingModule } from '@nestjs/testing';
import { LogController } from './log.controller';
import {request} from "http";

describe('LogController', () => {
  let controller: LogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogController],
    }).compile();

    controller = module.get<LogController>(LogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // it('/movies (GET)', () => {
  //   return request(app.getHttpServer()).get('/log').expect(200).expect([]);
  // })
});
