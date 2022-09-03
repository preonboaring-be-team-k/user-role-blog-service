import { Injectable, ExecutionContext, HttpException, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JWTAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization.split(' ')[1];
    req.user = this.validateToken(token);
    if (!req.user) {
      throw new ForbiddenException('존재하지 않는 사용자입니다.');
    }
    return true;
  }

  validateToken(token: string) {
    const secretKey = this.configService.get<string>('JWT_SECRET_KEY')
      ? this.configService.get<string>('JWT_SECRET_KEY')
      : 'dev';

    try {
      const verify = this.jwtService.verify(token, { secret: secretKey });
      return verify;
    } catch (e) {
      switch (e.name) {
        case 'JsonWebTokenError':
          throw new HttpException('유효하지 않은 토큰', 401);

        case 'TokenExpiredError':
          throw new HttpException('토큰 만료', 410);

        default:
          throw new HttpException('서버 오류', 500);
      }
    }
  }
}
