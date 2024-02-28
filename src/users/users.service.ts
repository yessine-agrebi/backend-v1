import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dtos/register.dto';
import { Role } from './roles';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAllUsers(): Promise<User[]> {
    return this.usersRepository.find({where: {
      role: Role.USER
    }});
  }


  async findOneUser(userId: number): Promise<User> {
    return this.usersRepository.findOneBy({ userId });
  }

  async create(user: RegisterUserDto): Promise<User> {
    const newUser = await this.findByEmail(user.email);
    console.log(newUser);
    if (newUser) {
      throw new Error('Email already in use');
    }

    return this.usersRepository.save(user);
  }

  async updateUser(userId: number, user: UserDto): Promise<User> {
    await this.usersRepository.update(userId, user);
    return this.usersRepository.findOneBy({ userId });
  }

  async removeUser(userId: number): Promise<void> {
    await this.usersRepository.delete(userId);
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

}
