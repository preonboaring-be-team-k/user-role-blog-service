import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorator/roles.decorator';
import { JWTAuthGuard } from '../auth/guard/jwt.auth.guard';
import { Role } from '../user/entities/role.enum';
import { NoticeAPIDocs } from './docs/notice.docs';
import { NoticeInput } from './dtos/notice.dto';
import { Notice } from './entities/notice.entity';
import { NoticeService } from './notice.service';

@UseGuards(JWTAuthGuard)
@ApiBearerAuth('Access Token')
@Controller('notice')
@ApiTags('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

    /**
     * 공지 생성
     * @param title 공지 제목
     * @param description 공지 본문
     * @returns 생성한 Notice object
     */
    @Roles(Role.ADMIN)
    @Post()
    @ApiOperation(NoticeAPIDocs.CreateOperation())
    @ApiCreatedResponse({type: Notice})
    async create(
        @Body() input: NoticeInput
        // @CurrentUser() currentUser: ICurrentUser,
    ){
        return await this.noticeService.create(input)
    }

    /**
     * 공지 수정
     * @param title 공지 제목
     * @param description 공지 본문
     * @returns 생성한 Notice 객체
     */
    @Roles(Role.ADMIN)
    @Put(':id')
    @HttpCode(204)
    @ApiOperation(NoticeAPIDocs.UpdateOperation())
    @ApiNoContentResponse(NoticeAPIDocs.NoContentResponse())
    @ApiCreatedResponse({type: Notice})
    async update(
        @Param('id') id: string,
        @Body() input: NoticeInput
    ){
        return await this.noticeService.update(id, input)
    }

    /**
     * 공지 삭제
     * @param id 삭제할 공지 id
     * @returns '공지 삭제'
     */
    @Roles(Role.ADMIN)
    @Delete(':id')
    @ApiOperation(NoticeAPIDocs.DeleteByIdOperation())
    @ApiOkResponse({type: String})
    @ApiNoContentResponse(NoticeAPIDocs.NoContentResponse())
    async delete(
        @Param('id') id: string,
    ){
        return await this.noticeService.delete(id)
    }

    /**
     * 공지 전체 조회
     * @returns Notice 객체의 배열
     */
    @Get()
    @ApiOperation(NoticeAPIDocs.GetListOperation())
    @ApiOkResponse({type: [Notice]})
    async find(){
        return await this.noticeService.find()
    }

    /**
     * 공지 내용 조회
     * @param id 조회할 공지 id
     * @returns Notice 객체
     */
    @Get(':id')
    @ApiOperation(NoticeAPIDocs.GetByIdOperation())
    @ApiOkResponse({type: Notice})
    @ApiNoContentResponse(NoticeAPIDocs.NoContentResponse())
    async findOne(
        @Param('id') id: string
    ){
        return await this.noticeService.findOne(id)
    }
}