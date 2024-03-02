import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dtos/register.dto';
import { UserDto } from './dtos/user.dto';
import generateRandomPassword from 'src/utils';
import { scryptSync } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAllUsers(): Promise<User[]> {
    return this.usersRepository.find({
      relations: ['meetings'],
    });
  }

  async findOneUser(userId: number): Promise<User> {
    return this.usersRepository.findOneBy({ userId });
  }

  async createUser(user: RegisterUserDto): Promise<User> {
    const newUser = await this.findByEmail(user.email);
    const salt = generateRandomPassword(8);
    const hash = scryptSync(user.password, salt, 32) as Buffer;
    const hashedPassword = `${salt}.${hash.toString('hex')}`;
    if (newUser) {
      throw new ConflictException('Email already in use');
    }

    return this.usersRepository.save({
      ...user,
      password: hashedPassword,
    });
  }

  async updateUser(userId: number, user: UserDto): Promise<User> {
    try {
      await this.usersRepository.update(userId, user);
      return this.usersRepository.findOneBy({ userId });
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }

  async removeUser(userId: number): Promise<string> {
    const user = await this.findOneUser(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    try {
      await this.usersRepository.delete(userId);
      return `User with ID ${userId} has been successfully deleted`;
    } catch (error) {
      throw new Error(
        `Failed to delete user with ID ${userId}: ${error.message}`,
      );
    }
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
