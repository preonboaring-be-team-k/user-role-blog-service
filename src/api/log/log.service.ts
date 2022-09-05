import { HttpException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Gender, PAGE_SIZE, Sort, Status } from './entity/variables.util';
import { Log } from './entity/log.entity';
import { UserEntity } from '../user/entities/user.entity';
import { makeResponse } from '../../config/function.utils';
import { response } from '../../config/response.utils';

@Injectable()
export class LogService {
  constructor(private dataSource: DataSource) {}

  async retrieveLogs(request: any) {
    try {
      let logs = [];

      // query 생성
      const queryResult = this.dataSource.createQueryBuilder(Log, 'log');

      queryResult.leftJoin(UserEntity, 'user', 'user.id = log.userId');

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

      // 성별 필터
      if (request.query.gender == Gender.MAN) {
        await queryResult.andWhere('user.gender IN (:gender)', {
          gender: Gender.MAN,
        });
      } else if (request.query.gender == Gender.WOMAN) {
        await queryResult.andWhere('user.gender IN (:gender)', {
          gender: Gender.WOMAN,
        });
      }

      // 날짜순 내림차순, 오름차순 정렬
      if (request.query.sort == Sort.DESC) {
        await queryResult.orderBy('user.createAt', 'DESC');
      } else if (request.query.sort == Sort.ASC) {
        await queryResult.orderBy('user.createAt', 'ASC');
      }

      await queryResult
        .select(['log.createdAt as accessAt'])
        .addSelect([
          'user.id as id',
          'user.name as name',
          'user.createAt as creatAt',
          'user.status as status',
          'user.gender as gender',
          'user.role as role',
          'user.age as age',
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
      logs = await queryResult.getRawMany();

      const data = {
        log: logs,
      };

      const result = makeResponse(response.SUCCESS, data);

      return result;
    } catch (error) {
      console.log(error);
      return response.ERROR;
    }
  }
}
