import { AbstractEntity } from 'src/common/abstract.entity';
import { RoleType } from 'src/common/constants/role-type';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class User extends AbstractEntity {
  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column({ type: 'text', default: RoleType.USER })
  role: RoleType;

  @Column({ select: false })
  password: string;
}
