import { Injectable } from '@nestjs/common';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { Repository } from 'typeorm';
import { Availability } from './entities/availability.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(Availability)
    private availabilityRepository: Repository<Availability>,
  ) {}
  create(createAvailabilityDto: CreateAvailabilityDto): Promise<Availability> {
    return this.availabilityRepository.save(createAvailabilityDto);
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
