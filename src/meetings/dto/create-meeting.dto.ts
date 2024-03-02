import { Tutor } from 'src/tutors/entities/tutor.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateMeetingDto {
  subject: string;
  date: Date;
  startTime: string;
  duration: number;
  tutor: Tutor;
  user: User;
}
