import { Injectable } from '@nestjs/common';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { Repository } from 'typeorm';
import { Availability } from './entities/availability.entity';

@Injectable()
export class AvailabilityService {
  constructor (private availabilityRepository: Repository<Availability>) {}
  create(createAvailabilityDto: CreateAvailabilityDto): Promise<Availability> {
    return this.availabilityRepository.save(createAvailabilityDto);
  }

  findAll(): Promise<Availability[]> {
    return this.availabilityRepository.find();
  }

  findOne(id: number): Promise<Availability> {
    return this.availabilityRepository.findOneBy({availabilityId: id});
  }

  // update(id: number, updateAvailabilityDto: UpdateAvailabilityDto) {
  //   return `This action updates a #${id} availability`;
  // }

  remove(id: number) {
    return this.availabilityRepository.delete(id);
  }
}
