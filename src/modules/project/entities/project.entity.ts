import { AbstractEntity } from 'src/common/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'projects' })
export class Project extends AbstractEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  github_url: string;

  @Column({ nullable: true })
  live_url: string;

  @Column('text', { array: true })
  tags: string[];
}
