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

    @Post('create')
    @ApiCreatedResponse({type: Notice})
    async create(
        @Body() input: NoticeInput
        // @CurrentUser() currentUser: ICurrentUser,
    ){
        return await this.noticeService.create(input)
    }

    @Put('/updateById/:id')
    @ApiCreatedResponse({type: Notice})
    async update(
        @Param('id') id: string,
        @Body() input: NoticeInput
    ){
        return await this.noticeService.update(id, input)
    }

    @Delete('/deleteById/:id')
    @ApiOkResponse({type: String})
    async delete(
        @Param('id') id: string,
    ){
        return await this.noticeService.delete(id)
    }

    @Get('getNotice')
    @ApiOkResponse({type: [Notice]})
    async find(){
        return await this.noticeService.find()
    }

    @Get('/getNoticeById/:id')
    @ApiOkResponse({type: Notice})
    async findOne(
        @Param('id') id: string
    ){
        return await this.noticeService.findOne(id)
    }
}