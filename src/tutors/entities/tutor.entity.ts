import { Availability } from 'src/availability/entities/availability.entity';
import { Meeting } from 'src/meetings/entities/meeting.entity';
import { Speciality } from 'src/specialities/entities/speciality.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Tutor extends User {
  @ManyToOne(() => Speciality, (speciality) => speciality.specialityId)
  @JoinColumn({ name: 'speciality_id' })
  speciality: Speciality;
  @OneToMany(() => Availability, (availability) => availability.tutor, {
    cascade: true,
  })
  availabilities: Availability[];
  @OneToMany(() => Meeting, (meeting) => meeting.tutor, { cascade: true })
  meetings: Meeting[];
  @Column({ nullable: false })
  description: string;
  @Column({ nullable: false })
  experience: number;
  @Column({ nullable: true })
  profilePicture: string;
  @Column({ nullable: true })
  price: number;
  @Column({ nullable: true })
  rating: number;
}
