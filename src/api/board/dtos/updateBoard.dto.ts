export class UpdateBoardDto {
    
    title: string;
    discription: string;

    constructor(title: string, discription: string){
        this.title = title;
        this.discription = discription;
    }
}