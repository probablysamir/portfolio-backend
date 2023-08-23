import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { hash } from 'bcrypt';
import { RegisterUserDto } from 'src/modules/auth/dto/register-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  async findUserById(id: string) {
    return this.userRepository.findOne({
      where: { id },
    });
  }
  async findUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async createUser(userInfo: RegisterUserDto) {
    const user = { ...userInfo };
    user.password = await hash(userInfo.password, 10);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } =
      await this.userRepository.save(user);
    return userWithoutPassword;
  }

  async getUserWithPassword(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, role: true },
    });
  }
}
