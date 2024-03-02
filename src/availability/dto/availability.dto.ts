import { Type } from 'class-transformer';
import { TutorDto } from 'src/tutors/dto/tutor.dto';
import { UserDto } from 'src/users/dtos/user.dto';

export class AvailabilityDto {
  day: string;
  startTime: string;
  endTime: string;
  @Type(() => UserDto)
  tutor: TutorDto;
  startDate: Date;
  endDate: Date;
}
