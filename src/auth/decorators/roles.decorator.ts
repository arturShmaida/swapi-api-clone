import { Reflector } from '@nestjs/core';

export const ROLE_USER = 'user';
export const ROLE_ADMIN = 'admin';
export enum RolesEnum {
  ROLE_USER,
  ROLE_ADMIN,
}
export const Roles = Reflector.createDecorator<string[]>();
