import { Timeslot } from 'src/timeslots/entities/timeslot.entity';
import { Tutor } from 'src/tutors/entities/tutor.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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
  @ManyToOne(() => Tutor, (tutor) => tutor.availabilities)
  @JoinColumn({ name: 'tutor_id' })
  tutor: Tutor;

  @OneToMany(() => Timeslot, (timeslot) => timeslot.availability)
  timeslots: Timeslot[];
}
