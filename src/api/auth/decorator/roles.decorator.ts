import { SetMetadata } from '@nestjs/common';
import { Role } from '../../user/entities/role.enum';

export const ROLES_KEY = Role.ADMIN;
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
