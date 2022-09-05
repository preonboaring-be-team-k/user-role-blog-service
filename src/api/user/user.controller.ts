import { Body, Controller, Delete, Post, Res, UseGuards } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { User } from './decorator/user.decorator';
import { UserAPIDocs } from './docs/user.docs';
import { CreateUserDto } from './dtos/createUser.dto';
import { LoginRequestDto } from './dtos/loginRequest.dto';
import { LocalAuthGuard } from '../auth/guard/local.guard';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { Response } from 'express';

@ApiTags('User API')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  /**
   * 회원가입
   * @param email 이메일
   * @param name 사용자 이름
   * @param password 계정 비밀번호
   * @param age 사용자 나이
   * @param gender 사용자 성별
   * @returns 생성된 계정 정보(비밀번호 제외)
   * */
  @ApiOperation(UserAPIDocs.signUpOperation())
  @ApiConflictResponse(UserAPIDocs.signUpConflictResponse())
  @ApiCreatedResponse(UserAPIDocs.signUpCreatedResponse())
  @Post('/signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.userService.signup(createUserDto);
  }

  /**
   * 로그인
   * @param email 이메일
   * @param password 계정 비밀번호
   * @returns 입력된 계정 정보(비밀번호 제외)
   * */
  @ApiOperation(UserAPIDocs.loginOperation())
  @ApiResponse(UserAPIDocs.loginResponse())
  @ApiUnauthorizedResponse(UserAPIDocs.loginUnauthorizedResponse())
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Body() loginRequestDto: LoginRequestDto) {
    return this.authService.login(loginRequestDto);
  }

  /**
   * 회원탈퇴
   * @param id 유저 id
   * @returns 성공여부
   * */
  @ApiOperation(UserAPIDocs.deleteUserOperation())
  @ApiResponse(UserAPIDocs.deleteUserResponse())
  @ApiUnauthorizedResponse(UserAPIDocs.deleteUserUnauthorizedResponse())
  @UseGuards(JwtAuthGuard)
  @Delete('/')
  deleteUser(@User() user) {
    return this.userService.deleteUserByEmail(user.id);
  }
}
