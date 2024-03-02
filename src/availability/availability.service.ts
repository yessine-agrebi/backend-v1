import { Injectable } from '@nestjs/common';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { Repository } from 'typeorm';
import { Availability } from './entities/availability.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Tutor } from 'src/tutors/entities/tutor.entity';
import { AvailabilityDto } from './dto/availability.dto';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(Availability)
    private availabilityRepository: Repository<Availability>,
    @InjectRepository(Tutor)
    private tutorRepository: Repository<Tutor>,
  ) {}

  async create(createAvailabilityDto: AvailabilityDto): Promise<Availability> {
    const availability = this.availabilityRepository.create(
      createAvailabilityDto,
    );
    console.log(availability);
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
    return await this.availabilityRepository.save(availability);
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
