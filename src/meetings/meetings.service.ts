import { Injectable } from '@nestjs/common';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Meeting } from './entities/meeting.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Tutor } from 'src/tutors/entities/tutor.entity';

@Injectable()
export class MeetingsService {
  constructor(
    @InjectRepository(Meeting)
    private meetingRepository: Repository<Meeting>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Tutor)
    private tutorRepository: Repository<Tutor>,
  ) {}
  async create(createMeetingDto: CreateMeetingDto) {
    const meeting = this.meetingRepository.create(createMeetingDto);
    if (meeting) {
      const user = await this.userRepository.findOne({
        where: { userId: createMeetingDto.user.userId },
        relations: ['meetings'],
      });
      if (user) {
        user.meetings.push(meeting);
        await this.userRepository.save(user);
      }
      const tutor = await this.tutorRepository.findOne({
        where: { userId: createMeetingDto.tutor.userId },
        relations: ['meetings'],
      });
      if (tutor) {
        tutor.meetings.push(meeting);
        await this.tutorRepository.save(tutor);
      }
    }
    return this.meetingRepository.save(meeting);
  }

  findAll() {
    return `This action returns all meetings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} meeting`;
  }

  update(id: number, updateMeetingDto: UpdateMeetingDto) {
    return this.meetingRepository.update(id, updateMeetingDto);
  }

  remove(id: number) {
    return `This action removes a #${id} meeting`;
  }
}
