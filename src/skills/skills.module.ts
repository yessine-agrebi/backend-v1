import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { SpecialitiesModule } from 'src/specialities/specialities.module';

@Module({
  imports: [TypeOrmModule.forFeature([Skill]), SpecialitiesModule],
  controllers: [SkillsController],
  providers: [SkillsService],
})
export class SkillsModule {}
