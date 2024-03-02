import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Meeting {
    @PrimaryGeneratedColumn({name: 'meeting_id'})
    meetingId: number;
    date: Date;
    time: string;
    tutorId: number;
    studentId: number;
    subject: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
