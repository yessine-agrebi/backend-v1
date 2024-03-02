import { Tutor } from 'src/tutors/entities/tutor.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Meeting {
  @PrimaryGeneratedColumn({ name: 'meeting_id' })
  meetingId: number;
  @Column({ nullable: false})
  date: Date;
  @Column({ nullable: false, name: 'start_time' })
  startTime: string;
  @Column({ nullable: false})
  duration: number;
  @Column({ nullable: false})
  subject: string;
  @Column({ default: 'scheduled'})
  status: string;//shceduled, canceled, done
  @Column({ default: false})
  paid: boolean;
  //tutor can have many meetings ---> meeting can have only one tutor
  @ManyToOne(() => Tutor, (tutor) => tutor.meetings)
  @JoinColumn({ name: 'tutor_id' })
  tutor: Tutor;
  //user can have many meetings ---> meeting can have only one user
  @ManyToOne(() => User, (user) => user.meetings)
  @JoinColumn({ name: 'user_id' })
  user: User;
  
}
