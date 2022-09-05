import { SetMetadata } from '@nestjs/common';
import { Role } from '../../user/entities/role.enum';

export const Roles = (role: Role) => SetMetadata('roles', role);
