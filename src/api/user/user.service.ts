import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/createUser.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { Status } from './entities/status.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
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

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      delete user.password;
      return user;
    } else throw new UnauthorizedException('비밀번호가 틀립니다.');
  }

  async login(user) {
    return user;
  }

  async deleteUserByEmail(id: number) {
    const found = await this.userRepository.findOne({ where: { id } });
    found.deleteAt = new Date();
    found.status = Status.STOP;
    const result = await this.userRepository.save(found);
    return result;
  }
}
