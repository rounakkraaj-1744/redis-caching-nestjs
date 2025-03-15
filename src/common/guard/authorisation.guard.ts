import { Injectable, CanActivate, ExecutionContext, ForbiddenException, } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();

    const user = request.body;

    if (!user || !user.roles) {
      throw new ForbiddenException('Access denied. No roles found.');
    }

    const userRoles = Array.isArray(user.roles) ? user.roles : [user.roles];

    const hasRole = requiredRoles.some((role) => userRoles.includes(role));

    if (!hasRole) {
      throw new ForbiddenException('Access denied. Insufficient permissions.');
    }
    return true;
  }
}