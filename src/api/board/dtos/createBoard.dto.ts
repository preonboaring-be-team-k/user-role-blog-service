export class CreateBoardDto {

    title: string;
    discription: string;
    // role

    constructor(title: string, discription: string){
        this.title = title;
        this.discription = discription;
    }
}