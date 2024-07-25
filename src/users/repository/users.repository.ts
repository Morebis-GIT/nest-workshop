import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from '../entities/user.entity';
import { IUpdateUser, IUser } from '../models/user.model';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: IUser): Promise<User> {
    const newUser = new User(user);
    return this.userRepository.save(newUser);
  }

  async update(id: string, user: IUpdateUser): Promise<UpdateResult> {
    return this.userRepository.update(id, user);
  }

  async findOne(id: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
