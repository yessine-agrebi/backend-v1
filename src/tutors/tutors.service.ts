import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/users/roles';
import { UserDto } from 'src/users/dtos/user.dto';
import { TutorDto } from './dto/tutor.dto';

@Injectable()
export class TutorsService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  
  findAllTutors() {
    return this.usersRepository.find({
      where: {
        role: Role.TUTOR,
      },
    });
  }

  findOneTutor(id: number) {
    return this.usersRepository.findOneBy({ userId: id });
  }

  async updateTutor(userId: number, tutor: TutorDto): Promise<User> {
    try {
      await this.usersRepository.update(userId, tutor);
      return this.usersRepository.findOneBy({ userId });
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`)
    }
  }

  async removeTutor(userId: number): Promise<string> {
    const user = await this.findOneTutor(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    try {
      await this.usersRepository.delete(userId);
      return `Tutor with ID ${userId} has been successfully deleted`;
    } catch (error) {
      throw new Error(
        `Failed to delete tutor with ID ${userId}: ${error.message}`,
      );
    }
  }
}
