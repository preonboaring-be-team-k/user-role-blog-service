import { Body, Controller, Delete, Post, Req, UseGuards } from '@nestjs/common';
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
  deleteUser(email: string, password: string) {
    return this.userService.deleteUserByEmail(email, password);
  }
}
