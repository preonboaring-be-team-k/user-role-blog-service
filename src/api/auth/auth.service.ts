import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { LoginRequestDto } from '../user/dtos/loginRequest.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async generateAccessToken(user) {
    const payload = { username: user.name, sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload);
    return token;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      delete user.password;
      const token = await this.generateAccessToken(user);
      return { user, token };
    } else throw new UnauthorizedException('비밀번호가 틀립니다.');
  }

  async login(loginRequestDto: LoginRequestDto) {
    const { email, password } = loginRequestDto;
    const result = await this.validateUser(email, password);
    return result;
  }
}
