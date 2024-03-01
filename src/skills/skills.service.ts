import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { Repository } from 'typeorm';
import { Speciality } from 'src/specialities/entities/speciality.entity';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private skillsRepository: Repository<Skill>,
    @InjectRepository(Speciality)
    private specialityRepository: Repository<Speciality>,
  ) {}

  async create(createSkillDto: CreateSkillDto) {
    const skill: Skill = await this.skillsRepository.save(createSkillDto);
    console.log(skill);
    if (skill) {
      const speciality = await this.specialityRepository.findOne({
        where: { specialityId: skill.speciality.specialityId },
        relations: ['skills'],
      });
      if (speciality) {
        console.log(speciality);
        speciality.skills.push(skill);
        await this.specialityRepository.save(speciality);
      }
    }
    return skill;
  }

  async findAll(): Promise<Skill[]> {
    return await this.skillsRepository.find({ relations: ['speciality'] });
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
