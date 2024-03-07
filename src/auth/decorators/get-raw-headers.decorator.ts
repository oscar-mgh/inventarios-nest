import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetRawHeaders = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.rawHeaders;
  },
);
