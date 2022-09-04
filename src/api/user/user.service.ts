import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { Status } from './entities/status.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
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
    found.deleteAt = new Date();
    found.status = Status.STOP;
    await this.userRepository.save(found);
    return { success: true };
  }
}
