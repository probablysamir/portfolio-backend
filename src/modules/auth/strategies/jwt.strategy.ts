import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/services/user.service';
import { JWT } from 'src/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
) {
  constructor(public readonly userService: UserService) {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT.secret,
    });
  }

  async validate({ iat, exp, email }) {
    if (exp - iat <= 0) throw new UnauthorizedException();
    const user =
      await this.userService.findUserByEmail(email);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
