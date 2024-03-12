import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { TutorDto } from './dto/tutor.dto';
import { Tutor } from './entities/tutor.entity';
import { CreateTutorDto } from './dto/create-tutor.dto';
import generateRandomPassword from 'src/utils';
import { scryptSync } from 'crypto';

@Injectable()
export class TutorsService {
  constructor(
    @InjectRepository(Tutor)
    private tutorsRepository: Repository<Tutor>,
  ) {}
  async findByEmail(email: string): Promise<User> {
    return this.tutorsRepository.findOne({ where: { email } });
  }
  async createTutor(tutor: CreateTutorDto): Promise<Tutor> {
    const newUser = await this.findByEmail(tutor.email);
    const salt = generateRandomPassword(8);
    const hash = scryptSync(tutor.password, salt, 32) as Buffer;
    const hashedPassword = `${salt}.${hash.toString('hex')}`;
    if (newUser) {
      throw new ConflictException('Email already in use');
    }

    return this.tutorsRepository.save({
      ...tutor,
      password: hashedPassword,
    });
  }

  findAllTutors() {
    return this.tutorsRepository.find({
      relations: ['speciality', 'availabilities', 'meetings'],
    });
  }

  findOneTutor(id: number) {
    return this.tutorsRepository.findOne({
      where: { userId: id },
      relations: ['speciality', 'availabilities', 'meetings']
    });
  }

  async updateTutor(userId: number, tutor: TutorDto): Promise<User> {
    try {
      await this.tutorsRepository.update(userId, tutor);
      return this.tutorsRepository.findOne({
        where: { userId },
        relations: ['speciality'],
      });
    } catch (error) {
      throw new Error(`Failed to update tutor: ${error.message}`);
    }
  }

  async removeTutor(tutorId: number): Promise<string> {
    const user = await this.findOneTutor(tutorId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    try {
      await this.tutorsRepository.delete(tutorId);
      return `Tutor with ID ${tutorId} has been successfully deleted`;
    } catch (error) {
      throw new Error(
        `Failed to delete tutor with ID ${tutorId}: ${error.message}`,
      );
    }
  }
}
