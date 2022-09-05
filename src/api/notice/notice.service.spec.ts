import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Notice } from './entities/notice.entity';
import { NoticeService } from './notice.service';

class MockNoticeRepository {
  mockDB = [
    {
      id: 'uuid',
      title: '가짜 게시글',
      description: '가짜 본문',
      user: {},
    },
  ];

  save(input) {
    input.id = 'uuid';
    this.mockDB.push(input);
    return input;
  }

  find() {
    return this.mockDB;
  }

  findOneBy({ id }) {
    return this.mockDB.find((e) => e.id === id);
  }

  delete() {
    return {affected: [this.mockDB.pop()].length};
  }
}

describe('NoticeService', () => {
  let noticeService: NoticeService;

  beforeEach(async () => {
    const noticeModule = await Test.createTestingModule({
      providers: [
        NoticeService,
        {
          provide: getRepositoryToken(Notice),
          useClass: MockNoticeRepository,
        },
      ],
    }).compile();

    noticeService = noticeModule.get<NoticeService>(NoticeService);
  });

  describe('create', () => {
    it('제목과 본문을 입력받아 새 Notice lecord를 저장합니다.', async () => {
      let myData = {
        title: '테스트 제목',
        description: '테스트 본문',
      };
      const result = await noticeService.create(myData);
      myData['id'] = 'uuid';
      expect(result).toStrictEqual(myData);
    });
  });

  describe('update', () => {
    it('수정할 Notice의 기존 값에 수정 값을 덮어씌웁니다.', async () => {
      let myData = {
        description: '가짜 본문 수정!',
      };
      const result = await noticeService.update('uuid', myData);
      const expectData = {
        id: 'uuid',
        title: '가짜 게시글',
        description: '가짜 본문 수정!',
        user: {},
      };
      expect(result).toStrictEqual(expectData);
    });
  });

  describe('find', () => {
    it('테이블의 전체 Notice값을 반환합니다.', async () => {
      const result = await noticeService.find();
      expect(result).toHaveLength(1);
    });
  });
  describe('findOne', () => {
    it('입력한 id값을 가진 Notice를 반환합니다.', async () => {
      const result = await noticeService.findOne('uuid');
      const expectData = {
        id: 'uuid',
        title: '가짜 게시글',
        description: '가짜 본문',
        user: {},
      };
      expect(result).toStrictEqual(expectData);
    });
  });

  describe('delete', () => {
    it('입력한 id값을 가진 Notice를 물리적으로 삭제합니다.', async () => {
      await noticeService.delete('uuid');
      const result = await noticeService.find();
      expect(result).toHaveLength(0);
    });
  });
});
