import { Speciality } from 'src/specialities/entities/speciality.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Skill {
  @PrimaryGeneratedColumn({ name: 'skill_id' })
  skillId: number;
  @Column()
  name: string;
  @ManyToOne(() => Speciality, (speciality) => speciality.skills)
  @JoinColumn({ name: 'speciality_id' })
  speciality: Speciality;
}
