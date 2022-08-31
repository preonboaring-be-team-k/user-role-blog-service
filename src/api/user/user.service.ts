import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';

@Injectable()
export class UserService {
  // constructor() {}

  signup(createUserDto: CreateUserDto) {
    return createUserDto;
  }

  login(email: string, password: string) {
    return { email, password };
  }

  deleteUserByEmail(email: string, password: string) {
    return { email, password };
  }
}
