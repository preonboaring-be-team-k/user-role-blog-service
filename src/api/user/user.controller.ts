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
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserAPIDocs } from './docs/user.docs';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';

@ApiTags('User API')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 회원가입
  @ApiOperation(UserAPIDocs.signUpOperation())
  @ApiConflictResponse(UserAPIDocs.signUpConflictResponse())
  @ApiCreatedResponse(UserAPIDocs.signUpCreatedResponse())
  @Post('/signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.userService.signup(createUserDto);
  }

  // 로그인
  @ApiOperation(UserAPIDocs.loginOperation())
  @ApiResponse(UserAPIDocs.loginResponse())
  @ApiUnauthorizedResponse(UserAPIDocs.loginUnauthorizedResponse())
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  login(@Req() req) {
    return this.userService.login(req.user);
  }

  // 회원탈퇴
  @ApiOperation(UserAPIDocs.deleteUserOperation())
  @Delete('/')
  deleteUser(@Query('id', ParseIntPipe) id: number) {
    return this.userService.deleteUserByEmail(id);
  }
}
