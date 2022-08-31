import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/createUser.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const { email, name, password, age, gender } = createUserDto;

    if (await this.userRepository.findOne({ where: { email } }))
      throw new ConflictException(
        `이미 가입한 이메일입니다. 다른 계정으로 회원가입 해주세요.`,
      );

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      email,
      name,
      password: hashedPassword,
      age,
      gender,
    });
    const result = await this.userRepository.save(user);

    return result;
  }

  login(email: string, password: string) {
    return { email, password };
  }

  deleteUserByEmail(email: string, password: string) {
    return { email, password };
  }
}
