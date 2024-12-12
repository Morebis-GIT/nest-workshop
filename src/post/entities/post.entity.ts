import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './../../users/entities/user.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  status: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by', referencedColumnName: 'id' })
  user?: User;

  @CreateDateColumn({
    type: Date,
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: Date,
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
    name: 'updated_at',
  })
  updatedAt: Date;

  constructor(post: Post) {
    if (post) {
      Object.assign(this, post);
    }
  }
}
