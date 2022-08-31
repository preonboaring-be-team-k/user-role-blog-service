import { Body, Controller, Delete, Post } from '@nestjs/common';
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
  @Post('/login')
  login(email: string, password: string) {
    return this.userService.login(email, password);
  }

  // 회원탈퇴
  @Delete('/')
  deleteUser(email: string, password: string) {
    return this.userService.deleteUserByEmail(email, password);
  }
}
