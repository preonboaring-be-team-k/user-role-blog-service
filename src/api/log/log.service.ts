import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { PAGE_SIZE, Sort, Status } from '../../common/variables.util';
import { Log } from './entity/log.entity';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Log)
    private readonly projectRepository: Repository<Log>,
    private connection: Connection,
  ) {}
  async retrieveUsers(request: any) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let users = [];
      const requesterCount = await this.projectRepository.createQueryBuilder(
        Log,
        'log',
      );

      // query 생성
      const queryResult = await getManager().createQueryBuilder(
        GridgeRequester,
        'requester',
      );

      // 상태 필터
      if (request.query.status == Status.ACTIVE) {
        await queryResult.andWhere('requester.status IN (:status)', {
          status: Status.ACTIVE,
        });

        await requesterCount.andWhere('requester.status IN (:status)', {
          status: Status.ACTIVE,
        });
      } else if (request.query.status == Status.INACTIVE) {
        await queryResult.andWhere('requester.status IN (:status)', {
          status: Status.INACTIVE,
        });

        await requesterCount.andWhere('requester.status IN (:status)', {
          status: Status.INACTIVE,
        });
      }

      // 날짜순 내림차순, 오름차순 정렬, 닉네임 가나다 순 정렬
      if (request.query.sort == Sort.DESC) {
        await queryResult.orderBy('requester.createdAt', 'DESC');
        await requesterCount.orderBy('requester.createdAt', 'DESC');
      } else if (request.query.sort == Sort.ASC) {
        await queryResult.orderBy('requester.createdAt', 'ASC');
        await requesterCount.orderBy('requester.createdAt', 'ASC');
      } else if (request.query.sort == 'realName') {
        await queryResult.orderBy('requester.realName', 'ASC');
        await requesterCount.orderBy('requester.realName', 'ASC');
      } // 현재 GridgeRequester DB에는 nickname 칼럼이 없다.

      await queryResult.select([
        'requester.id',
        'requester.realName',
        'requester.email',
        'requester.phoneNumber',
        'requester.createdAt',
        'requester.status',
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
        // await queryResult.offset(start).limit(pageSize);
        await queryResult.take(PAGE_SIZE).skip(page);
      }

      // 조회
      users = await queryResult.getMany();

      const counting = await requesterCount.select('requester.id').getMany();

      const data = {
        userCount: counting.length,
        user: users,
      };

      // const result = makeResponse(response.SUCCESS, data);

      // return result;
    } catch (error) {
      console.log(error);
      // return response.ERROR;
    }
  }
}
