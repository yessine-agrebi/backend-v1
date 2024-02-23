import { Injectable } from '@nestjs/common';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';
import { Repository } from 'typeorm';
import { Speciality } from './entities/speciality.entity';

@Injectable()
export class SpecialitiesService {
  constructor (private specialityRepository: Repository<Speciality>) {}
  create(createSpecialityDto: CreateSpecialityDto): Promise<Speciality> {
    return this.specialityRepository.save(createSpecialityDto);
  }

  findAll(): Promise<Speciality[]> {
    return this.specialityRepository.find();
  }

  findOne(id: number): Promise<Speciality> {
    return this.specialityRepository.findOneBy({specialityId: id});
  }

  update(id: number, updateSpecialityDto: CreateSpecialityDto) {
    return this.specialityRepository.update(id, updateSpecialityDto);
  }

  remove(id: number) {
    return this.specialityRepository.delete(id);
  }
}
