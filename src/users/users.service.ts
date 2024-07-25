import { Injectable } from '@nestjs/common';
import { UsersRepository } from './repository/users.repository';
import { IUpdateUser, IUser } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  create(createUserDto: IUser) {
    return this.usersRepository.create(createUserDto);
  }

  findAll() {
    return this.usersRepository.findAll();
  }

  findOne(id: string) {
    return this.usersRepository.findOne(id);
  }

  update(id: string, updateUser: IUpdateUser) {
    return this.usersRepository.update(id, updateUser);
  }

  remove(id: string) {
    return this.usersRepository.remove(id);
  }
}
