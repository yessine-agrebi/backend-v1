import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Availability } from './entities/availability.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Tutor } from 'src/tutors/entities/tutor.entity';
import { AvailabilityDto } from './dto/availability.dto';
import { Timeslot } from 'src/timeslots/entities/timeslot.entity';
import { TimeslotsService } from 'src/timeslots/timeslots.service';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(Availability)
    private availabilityRepository: Repository<Availability>,
    @InjectRepository(Tutor)
    private tutorRepository: Repository<Tutor>,
    private timeSlotService: TimeslotsService,
  ) {}

  async create(createAvailabilityDto: AvailabilityDto): Promise<Availability> {
    const availability = this.availabilityRepository.create(
      createAvailabilityDto,
    );
    
    if (availability) {
      const tutor = await this.tutorRepository.findOne({
        where: { userId: availability.tutor.userId },
        relations: ['availabilities'],
      });
      if (tutor) {
        tutor.availabilities.push(availability);
        await this.tutorRepository.save(tutor);
      }
    }
    const savedAvailability =  await this.availabilityRepository.save(availability);
    console.log(savedAvailability);
    const timeSlots = await this.timeSlotService.createTimeslots(savedAvailability);
    console.log("ts", timeSlots);
    return savedAvailability;
  }

  findAll(): Promise<Availability[]> {
    return this.availabilityRepository.find();
  }

  findOne(id: number): Promise<Availability> {
    return this.availabilityRepository.findOneBy({ availabilityId: id });
  }

  // update(id: number, updateAvailabilityDto: UpdateAvailabilityDto) {
  //   return `This action updates a #${id} availability`;
  // }

  remove(id: number) {
    return this.availabilityRepository.delete(id);
  }
}
