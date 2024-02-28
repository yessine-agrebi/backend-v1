import { Type } from 'class-transformer';
import { SpecialityDto } from 'src/specialities/dto/speciality.dto';

export class SkillDto {
  name: string;
  @Type(() => SpecialityDto)
  speciality: SpecialityDto;
}
