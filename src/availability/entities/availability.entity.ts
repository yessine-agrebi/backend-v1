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
  @ManyToOne(() => User, (user) => user.userId)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
