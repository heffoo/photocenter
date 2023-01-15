import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Consumer = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.consumer;
  },
);
