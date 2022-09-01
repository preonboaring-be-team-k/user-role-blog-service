import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PAGE_SIZE, Sort, Status } from './entity/variables.util';
import { Log } from './entity/log.entity';

@Injectable()
export class LogService {
  constructor(private dataSource: DataSource) {}
  async retrieveUsers(request: any) {
    try {
      let logs = [];

      // query 생성
      const queryResult = this.dataSource.createQueryBuilder(Log, 'log');

      // 상태 필터
      if (request.query.status == Status.ACTIVE) {
        await queryResult.andWhere('log.status IN (:status)', {
          status: Status.ACTIVE,
        });
      } else if (request.query.status == Status.INACTIVE) {
        await queryResult.andWhere('log.status IN (:status)', {
          status: Status.INACTIVE,
        });
      }

      // 날짜순 내림차순, 오름차순 정렬
      if (request.query.sort == Sort.DESC) {
        await queryResult.orderBy('log.createdAt', 'DESC');
      } else if (request.query.sort == Sort.ASC) {
        await queryResult.orderBy('log.createdAt', 'ASC');
      }

      await queryResult.select(['log.id', 'log.createdAt', 'log.status']);

      let page = 0;
      // 페이징;
      if (request.query.page) {
        if (request.query.page <= 0) {
          // 에러 처리
          request.query.page = 1;
        } else {
          page = (request.query.page - 1) * PAGE_SIZE;
        }
        await queryResult.take(PAGE_SIZE).skip(page);
      }

      // 조회
      logs = await queryResult.getMany();

      const data = {
        log: logs,
      };

      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
