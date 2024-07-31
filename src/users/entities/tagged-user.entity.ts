import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Post } from '../../post/entities/post.entity';

@Entity('post_tagged_user')
export class PostTaggedUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'user_id',
  })
  userId: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: User;

  @Column({
    name: 'post_id',
  })
  postId: number;

  @ManyToOne(() => Post, (post) => post.taggedPeople)
  @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
  post?: Post;
}
