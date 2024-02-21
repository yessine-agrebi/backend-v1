import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(userId: number): Promise<User> {
    return this.usersRepository.findOneBy({ userId });
  }

  async create(user: User): Promise<User> {
    const newUser = await this.findByEmail(user.email);
    console.log(newUser);
    if (newUser) {
      throw new Error('Email already in use');
    }
    return this.usersRepository.save(user);
  }

  async update(userId: number, user: User): Promise<User> {
    await this.usersRepository.update(userId, user);
    return this.usersRepository.findOneBy({ userId });
  }

  async remove(userId: number): Promise<void> {
    await this.usersRepository.delete(userId);
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
