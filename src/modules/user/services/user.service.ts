import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { hash } from 'bcrypt';
import { RegisterUserDto } from 'src/modules/auth/dto/register-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from '../dto/update-user.dto';
import { RoleType } from 'src/common/constants/role-type';

export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  async findUserById(id: string) {
    return await this.userRepository.findOne({
      where: { id },
    });
  }
  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({
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
    return await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, role: true },
    });
  }

  async updateUser(user: User, payload: UpdateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { id: user.id },
    });
    if (!existingUser)
      throw new Error(
        'User not found. Try logging in again',
      );

    const newUser = await this.userRepository.save({
      id: existingUser.id,
      ...payload,
    });

    return {
      success: true,
      data: newUser,
    };
  }

  async getAdminInfo() {
    return await this.userRepository.findOne({
      where: { role: RoleType.ADMIN },
    });
  }

  async uploadPortfolio(user: User, fileName: string) {
    return await this.userRepository.save({
      id: user.id,
      portfolio: fileName,
    });
  }

  async uploadAvatar(user: User, fileName: string) {
    return await this.userRepository.save({
      id: user.id,
      avatar: fileName,
    });
  }
}
