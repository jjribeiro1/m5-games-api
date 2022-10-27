import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ADMIN_KEY } from '../only-admin.decorator';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const isOnlyAdmin = this.reflector.getAllAndOverride<boolean>(ADMIN_KEY, [
      context.getClass(),
      context.getHandler(),
    ]);

    if (!isOnlyAdmin) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    return user.isAdmin && isOnlyAdmin;
  }
}
