import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Role } from '../entities/role.enum';

export interface ICurrentUser {
  sub: number;
  username: string;
  role: Role;
}

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
