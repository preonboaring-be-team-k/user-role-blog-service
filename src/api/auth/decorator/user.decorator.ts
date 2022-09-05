import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (request.user === undefined)
      throw new HttpException('로그인 후 이용해주시기 바랍니다.', 400);

    return request.user;
  },
);
