import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Speciality {
  @PrimaryGeneratedColumn({ name: 'speciality_id' })
  specialityId: number;
  @Column({ nullable: false, length: 100, unique: true })
  name: string;
  @OneToMany(() => User, (user) => user.userId)
  user: User;
}
