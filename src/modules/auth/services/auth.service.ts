import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { UserService } from 'src/modules/user/services/user.service';
import { DataSource } from 'typeorm';
import { RegisterUserDto } from '../dto/register-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { UserNotFoundException } from 'src/shared/exceptions/user-not-found-exception';
import { UtilsService } from 'src/shared/providers/utilsService';
import { User } from 'src/modules/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JWT } from 'src/constants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private dataSource: DataSource,
  ) {}

  async createToken(user: Partial<User>) {
    console.log(JWT.secret);

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        expiresIn: JWT.expiresIn,
        secret: JWT.secret,
      },
    );
    return { jwt: accessToken };
  }
  async registerUser(userInfo: RegisterUserDto) {
    const existingUser =
      await this.userService.findUserByEmail(
        userInfo.email,
      );
    if (existingUser)
      throw new BadRequestException('User already exists');
    const user =
      await this.userService.createUser(userInfo);
    return user;
  }

  async validateUser(email: string, password: string) {
    const user =
      await this.userService.getUserWithPassword(email);

    const isPasswordValid = await UtilsService.validateHash(
      password,
      user ? user.password : '',
    );
    if (!user || !isPasswordValid)
      throw new UserNotFoundException();
    return {
      role: user.role,
      email: user.email,
      id: user.id,
    };
  }

  async loginUser(input: LoginUserDto) {
    const user = await this.validateUser(
      input.email,
      input.password,
    );
    const token = await this.createToken(user);
    return {
      jwt: token.jwt,
      role: user.role,
    };
  }
}