import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../roles';
import { Speciality } from 'src/specialities/entities/speciality.entity';
import { Availability } from 'src/availability/entities/availability.entity';

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
  @ManyToOne(() => Speciality, (speciality) => speciality.specialityId)
  @JoinColumn({ name: 'speciality_id' })
  speciality: Speciality;
  @OneToMany(() => Availability, (availability) => availability.availabilityId)
  availabilities: Availability[];
  @Column({ nullable: true })
  description: string;
  @Column({ nullable: true })
  experience: number;
  @Column({ nullable: true, default: "Tunisia" })
  country: string;
  @Column({ nullable: true })
  profilePicture: string;
  @Column({ nullable: true })
  price: number;
  @Column({ nullable: true })
  rating: number;
}
