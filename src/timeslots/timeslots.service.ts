import { Injectable } from '@nestjs/common';
import { Availability } from 'src/availability/entities/availability.entity';
import { Timeslot } from './entities/timeslot.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TimeslotsService {
  constructor(
    @InjectRepository(Timeslot)
    private timeslotRepository: Repository<Timeslot>,
  ) {}

  //convert '09:00 am' to '09:00'
  convertTime = (time: string) => {
    const t = time.toLowerCase();
    const newTime = t.replace(' am', '').replace(' pm', '');
    const [hour, minute] = newTime.split(':');
    return `${hour}:${minute}`;
  };
  //generate time slots between start and end time
  generateTimeSlots = (startTime: string, endTime: string, availabilityId: number) => {
    const start = this.convertTime(startTime);
    const end = this.convertTime(endTime);
    const startOfDay = new Date(
      0,
      0,
      0,
      parseInt(start.split(':')[0]),
      parseInt(start.split(':')[1]),
    );
    const endOfDay = new Date(
      0,
      0,
      0,
      parseInt(end.split(':')[0]),
      parseInt(end.split(':')[1]),
    );
    const timeSlots = [];
    let currentTime = start;
    while (startOfDay.getTime() <= endOfDay.getTime()) {
      const [hour, minute] = currentTime.split(':');
      const formattedHour = hour.padStart(2, '0'); // Ensure hours have leading zero
      const formattedMinute = minute.padStart(2, '0'); // Ensure minutes have leading zero
      timeSlots.push({
        startTime: `${formattedHour}:${formattedMinute}`,
        endTime: `${formattedMinute === '00' ? `${formattedHour}:30` : `${parseInt(formattedHour) + 1}:00`}`,
        booked: false,
        availability: availabilityId,
      });
      const date = new Date(0, 0, 0, parseInt(hour), parseInt(minute));
      date.setMinutes(date.getMinutes() + 30);
      currentTime = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
      startOfDay.setHours(date.getHours());
      startOfDay.setMinutes(date.getMinutes());

    }
    return timeSlots;
  };

  async createTimeslots(availability: Availability): Promise<Timeslot[]> {
    const timeslots = this.generateTimeSlots(
      availability.startTime,
      availability.endTime,
      availability.availabilityId,
    );
    await this.timeslotRepository.save(timeslots);

    return timeslots;
  }

  async findAll(): Promise<Timeslot[]> {
    return this.timeslotRepository.find();
  }

  async findOne(id: number): Promise<Timeslot> {
    return this.timeslotRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.timeslotRepository.delete(id);
  }

  async findTimeslotsByAvailabilityId(
    availabilityId: number,
  ): Promise<Timeslot[]> {
    return this.timeslotRepository.find({
      where: {
        availability: {
          availabilityId,
        },
      },
      relations: ['availability'],
    });
  }
}
