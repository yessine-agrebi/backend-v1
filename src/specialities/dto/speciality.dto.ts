import { Type } from "class-transformer";
import { SkillDto } from "src/skills/dto/skill.dto";
import { UserDto } from "src/users/dtos/user.dto";

export class SpecialityDto {
    name: string;
    @Type(() => UserDto)
    user: UserDto;
    @Type(() => SkillDto)
    skills: SkillDto[];
}