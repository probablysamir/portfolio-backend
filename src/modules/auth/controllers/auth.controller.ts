import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from '../dto/register-user.dto';
import { AuthService } from '../services/auth.service';
import { LoginUserDto } from '../dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() input: RegisterUserDto) {
    return await this.authService.registerUser({
      email: input.email.trim().toLowerCase(),
      ...input,
    });
  }

  @Post('login')
  async login(@Body() input: LoginUserDto) {
    return await this.authService.loginUser(input);
  }
}
