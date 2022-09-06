import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorator/roles.decorator';
import { JWTAuthGuard } from '../auth/guard/jwt.auth.guard';
import { ICurrentUser, User } from '../user/decorator/user.decorator';
import { Role } from '../user/entities/role.enum';
import { NoticeAPIDocs } from './docs/notice.docs';
import { NoticeInput } from './dtos/createNotice.input';
import { NoticeDto } from './dtos/notice.dto';
import { NoticeListDto } from './dtos/noticeList.dto';
import { UpdateNoticeInput } from './dtos/updateNotice.input';
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
     * @returns json
     */
    @Roles(Role.ADMIN)
    @Post()
    @ApiOperation(NoticeAPIDocs.CreateOperation())
    @ApiCreatedResponse({type: NoticeDto})
    async create(
        @Body() input: NoticeInput,
        @User() currentUser: ICurrentUser
    ){
        return await this.noticeService.create(input, currentUser.sub)
    }

    /**
     * 공지 수정
     * @param title 공지 제목
     * @param description 공지 본문
     * @returns json
     */
    @Roles(Role.ADMIN)
    @Put(':id')
    @ApiOperation(NoticeAPIDocs.UpdateOperation())
    @ApiNoContentResponse(NoticeAPIDocs.NoContentResponse())
    @ApiCreatedResponse({type: NoticeDto})
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() input: UpdateNoticeInput,
        @User() currentUser: ICurrentUser
    ){
        return await this.noticeService.update(id, input, currentUser.sub)
    }

    /**
     * 공지 삭제
     * @param id 삭제할 공지 id
     * @returns '게시글 삭제'
     */
    @Roles(Role.ADMIN)
    @Delete(':id')
    @ApiOperation(NoticeAPIDocs.DeleteByIdOperation())
    @ApiOkResponse({type: String})
    @ApiNoContentResponse(NoticeAPIDocs.NoContentResponse())
    async delete(
        @Param('id', ParseIntPipe) id: number,
        @User() currentuser: ICurrentUser
    ){
        return await this.noticeService.delete(id, currentuser.sub)
    }

    /**
     * 공지 전체 조회
     * @returns Json Array
     */
    @Get()
    @ApiOperation(NoticeAPIDocs.GetListOperation())
    @ApiOkResponse({type: [NoticeListDto]})
    async find(){
        return await this.noticeService.find()
    }

    /**
     * 공지 내용 조회
     * @param id 조회할 공지 id
     * @returns Json
     */
    @Get(':id')
    @ApiOperation(NoticeAPIDocs.GetByIdOperation())
    @ApiOkResponse({type: NoticeDto})
    @ApiNoContentResponse(NoticeAPIDocs.NoContentResponse())
    async findOne(
        @Param('id', ParseIntPipe) id: number
    ){
        return await this.noticeService.findOne(id)
    }
}