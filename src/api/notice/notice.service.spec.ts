import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Notice } from "./entities/notice.entity";
import { NoticeService } from "./notice.service";

class MockNoticeRepository {
    mockDB = [
        {
            id: 'uuid',
            title: '가짜 게시글',
            description: '가짜 본문',
            user: {}
        }
    ]
    
    save(input) {
        input.id = 'uuid'
        this.mockDB.push(input)
        return input
    }

    findOneBy({id}){
        return this.mockDB.find((e => e.id === id))
    }

    delete(){
        this.mockDB.pop()
    }
}

describe('NoticeService', () => {
    let noticeService: NoticeService
  
    beforeEach(async () => {
      const noticeModule = await Test.createTestingModule({
        providers: [
            NoticeService,
            {
                provide: getRepositoryToken(Notice),
                useClass: MockNoticeRepository
            }
        ]
      }).compile();
  
      noticeService = noticeModule.get<NoticeService>(NoticeService);
    });
  
    it('create', async () => {
        let myData = {
            title: '테스트 제목',
            description: '테스트 본문'
        }
        const result = await noticeService.create(myData);
        myData['id'] = 'uuid'
        expect(result).toStrictEqual(myData)
    });

    it('update', async () => {
        let myData = {
            description: '가짜 본문 수정!'
        }
        const result = await noticeService.update('uuid', myData)
        const expectData = { 
            id: 'uuid', 
            title: '가짜 게시글', 
            description: '가짜 본문 수정!', 
            user: {} 
        }
        expect(result).toStrictEqual(expectData)
    })

    it('findOne', async () =>{
        const result = await noticeService.findOne('uuid')
        const expectData = {
            id: 'uuid',
            title: '가짜 게시글',
            description: '가짜 본문',
            user: {}
        }
        expect(result).toStrictEqual(expectData)
    })

    it('delete', async () => {
        const result = await noticeService.delete('uuid')
        expect(result).toStrictEqual('게시글 삭제')
    })
  });