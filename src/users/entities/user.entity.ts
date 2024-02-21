import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../roles';
import { Speciality } from 'src/specialities/entities/speciality.entity';

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
}
