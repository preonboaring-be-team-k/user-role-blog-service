import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateAccessToken(user) {
    const payload = { username: user.name, sub: user.id };
    const token = this.jwtService.sign(payload);
    return token;
  }
}
