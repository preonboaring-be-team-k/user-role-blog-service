import {
  ConflictException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { Status } from './entities/status.enum';
import { LoginRequestDto } from './dtos/loginRequest.dto';
// import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>, // private readonly authService: AuthService,
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
    delete result.password;
    return result;
  }

  async deleteUserByEmail(id: number) {
    const found = await this.userRepository.findOne({ where: { id } });

    if (!found) throw new HttpException('사용자 정보를 찾을 수 없습니다.', 404);

    found.deleteAt = new Date();
    found.status = Status.STOP;
    await this.userRepository.save(found);
    return { success: true };
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('존재하지 않는 계정입니다.');
    return user;
  }
}
