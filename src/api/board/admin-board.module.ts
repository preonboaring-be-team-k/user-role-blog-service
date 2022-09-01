import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminBoardController } from "./admin-board.controller";
import { AdminBoardService } from "./admin-board.service";
import { AdminBoard } from "./entities/admin-board.entity";

@Module({
    imports: [TypeOrmModule.forFeature([AdminBoard])],
    controllers: [AdminBoardController],
    providers: [AdminBoardService]
})
export class BoardModule {}