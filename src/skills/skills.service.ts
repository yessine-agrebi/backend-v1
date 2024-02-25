import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private skillsRepository: Repository<Skill>,
  ) {}
  create(createSkillDto: CreateSkillDto) {
    return this.skillsRepository.save(createSkillDto);
  }

  findAll() {
    return this.skillsRepository.find();
  }

  findOne(id: number) {
    return this.skillsRepository.findOneBy({ skillId: id });
  }

  update(id: number, updateSkillDto: CreateSkillDto) {
    return this.skillsRepository.update(id, updateSkillDto);
  }

  remove(id: number) {
    return this.skillsRepository.delete(id);
  }
}
