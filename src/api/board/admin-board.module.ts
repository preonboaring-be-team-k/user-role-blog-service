import { Module } from "@nestjs/common";
import { AdminBoardController } from "./admin-board.controller";
import { AdminBoardService } from "./admin-board.service";

@Module({
    controllers: [AdminBoardController],
    providers: [AdminBoardService]
})
export class BoardModule {}