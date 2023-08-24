import { AbstractEntity } from 'src/common/abstract.entity';
import { RoleType } from 'src/common/constants/role-type';
import { Blog } from 'src/modules/blog/entities/blog.entity';
import { Column, Entity, OneToMany } from 'typeorm';

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

  @Column({ nullable: true, default: 'default.png' })
  avatar: string;

  @Column({ nullable: true })
  portfolio: string;

  @OneToMany(() => Blog, (blog) => blog.user)
  blogs: Blog[];

  @Column({ nullable: true })
  github_url: string;

  @Column({ nullable: true })
  linkedin_url: string;

  @Column({ nullable: true })
  instagram_url: string;
}
