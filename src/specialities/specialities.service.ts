import { Injectable } from '@nestjs/common';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { Repository } from 'typeorm';
import { Speciality } from './entities/speciality.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SpecialitiesService {
  constructor(
    @InjectRepository(Speciality)
    private specialityRepository: Repository<Speciality>,
  ) {}
  create(createSpecialityDto: CreateSpecialityDto): Promise<Speciality> {
    return this.specialityRepository.save(createSpecialityDto);
  }

  findAll(): Promise<Speciality[]> {
    return this.specialityRepository.find();
  }

  findOne(specialityId: number): Promise<Speciality> {
    return this.specialityRepository.findOneBy({ specialityId });
  }

  update(id: number, updateSpecialityDto: CreateSpecialityDto) {
    return this.specialityRepository.update(id, updateSpecialityDto);
  }

  remove(id: number) {
    return this.specialityRepository.delete(id);
  }
}
