import { ApiProperty } from "@nestjs/swagger";

export class UpdateBoardDto {
    
    @ApiProperty({
        example: '웨인힐스벤처스 수정제목',
        description: '게시물 수정 제목',
        required: false
    })
    title: string;

    @ApiProperty({
        example: '웨인힐스벤처스의 수정내용입니다.',
        description: '게시물 수정내용',
        required: false
    })
    discription: string;

    constructor(title: string, discription: string){
        this.title = title;
        this.discription = discription;
    }
}