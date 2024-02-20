import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../roles";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn({name: 'user_id'})
    userId: number;
    @Column({name: 'first_name'})
    firstName: string;
    @Column({name: 'last_name'})
    lastName: string;
    @Column({unique: true})
    email: string;
    @Column()
    password: string;
    @Column({nullable: true})
    phone?: string;
    @Column({default: Role.USER})
    role: Role;
}