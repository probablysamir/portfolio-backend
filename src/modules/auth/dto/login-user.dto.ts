import { PickType } from '@nestjs/swagger';
import { RegisterUserDto } from './register-user.dto';

export class LoginUserDto extends PickType(
  RegisterUserDto,
  ['email', 'password'],
) {}
