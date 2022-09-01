import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PAGE_SIZE, Sort, Status } from './entity/variables.util';
import { Log } from './entity/log.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class LogService {
  constructor(private dataSource: DataSource) {}
  async retrieveLogs(request: any) {
    try {
      let logs = [];

      // query 생성
      const queryResult = this.dataSource.createQueryBuilder(User, 'user');

      queryResult.leftJoin(Log, 'log', 'user.id = log.userId');

      // 상태 필터
      if (request.query.status == Status.ACTIVE) {
        await queryResult.andWhere('user.status IN (:status)', {
          status: Status.ACTIVE,
        });
      } else if (request.query.status == Status.INACTIVE) {
        await queryResult.andWhere('user.status IN (:status)', {
          status: Status.INACTIVE,
        });
      }

      // 날짜순 내림차순, 오름차순 정렬
      if (request.query.sort == Sort.DESC) {
        await queryResult.orderBy('user.createAt', 'DESC');
      } else if (request.query.sort == Sort.ASC) {
        await queryResult.orderBy('user.createAt', 'ASC');
      }

      await queryResult.select([
        'user.id',
        'user.name',
        'user.createAt',
        'user.status',
        'user.gender',
        'user.role',
        'user.age',
      ]);

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
