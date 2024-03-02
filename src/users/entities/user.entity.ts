import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../roles';
import { Meeting } from 'src/meetings/entities/meeting.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;
  @Column({ name: 'first_name' })
  firstName: string;
  @Column({ name: 'last_name' })
  lastName: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column({ nullable: true })
  phone?: string;
  @Column({ default: Role.USER })
  role: Role;
  @Column({ nullable: true })
  profilePicture: string;
  @Column({ nullable: false, default: 'Tunisia' })
  country: string;
  @OneToMany(() => Meeting, (meeting) => meeting.user, { cascade: true })
  meetings: Meeting[];
}
