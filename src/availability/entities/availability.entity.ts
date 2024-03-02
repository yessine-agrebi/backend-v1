import { Tutor } from 'src/tutors/entities/tutor.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Availability {
  @PrimaryGeneratedColumn({ name: 'availability_id' })
  availabilityId: number;
  @Column({ nullable: false })
  day: string;
  @Column({ nullable: false, name: 'start_time' })
  startTime: string;
  @Column({ nullable: false, name: 'end_time' })
  endTime: string;
  @Column({ nullable: false, name: 'start_date' }) // Add start date
  startDate: Date;
  @Column({ nullable: false, name: 'end_date' }) // Add end date
  endDate: Date;
  @ManyToOne(() => Tutor, (tutor) => tutor.availabilities)
  @JoinColumn({ name: 'tutor_id' })
  tutor: Tutor;
}
