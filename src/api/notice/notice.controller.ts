import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { NoticeInput } from "./dtos/notice.dto";
import { Notice } from "./entities/notice.entity";
import { NoticeService } from "./notice.service";

@Controller('notice')
@ApiTags('notice')
export class NoticeController {
    constructor(
        private readonly noticeService: NoticeService
    ){}

    /**
     * 게시글 생성
     * @param title 게시글 제목
     * @param description 게시글 본문
     * @returns 생성한 Notice object
     */
    @Post()
    @ApiCreatedResponse({type: Notice})
    async create(
        @Body() input: NoticeInput
        // @CurrentUser() currentUser: ICurrentUser,
    ){
        return await this.noticeService.create(input)
    }

    /**
     * 게시글 수정
     * @param title 게시글 제목
     * @param description 게시글 본문
     * @returns 생성한 Notice 객체
     */
    @Put(':id')
    @ApiCreatedResponse({type: Notice})
    async update(
        @Param('id') id: string,
        @Body() input: NoticeInput
    ){
        return await this.noticeService.update(id, input)
    }

    /**
     * 게시글 삭제
     * @param id 삭제할 게시글 id
     * @returns '게시글 삭제'
     */
    @Delete(':id')
    @ApiOkResponse({type: String})
    async delete(
        @Param('id') id: string,
    ){
        return await this.noticeService.delete(id)
    }

    /**
     * 게시글 전체 조회
     * @returns Notice 객체의 배열
     */
    @Get()
    @ApiOkResponse({type: [Notice]})
    async find(){
        return await this.noticeService.find()
    }

    /**
     * 게시글 내용 조회
     * @param id 조회할 게시글 id
     * @returns Notice 객체
     */
    @Get(':id')
    @ApiOkResponse({type: Notice})
    async findOne(
        @Param('id') id: string
    ){
        return await this.noticeService.findOne(id)
    }
}