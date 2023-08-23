import * as bcrypt from 'bcrypt';

export class UtilsService {
  static validateHash(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
