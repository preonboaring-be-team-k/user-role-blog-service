import {
  Body,
  Controller,
  Delete,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 회원가입
  @Post('/signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.userService.signup(createUserDto);
  }

  // 로그인
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  login(@Req() req) {
    return this.userService.login(req.user);
  }

  // 회원탈퇴
  @Delete('/')
  deleteUser(@Query('id', ParseIntPipe) id: number) {
    return this.userService.deleteUserByEmail(id);
  }
}
