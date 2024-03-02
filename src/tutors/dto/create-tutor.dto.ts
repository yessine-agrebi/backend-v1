import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { SpecialityDto } from 'src/specialities/dto/speciality.dto';
import { RegisterUserDto } from 'src/users/dtos/register.dto';

export class CreateTutorDto extends RegisterUserDto {
  @Type(() => SpecialityDto)
  speciality: SpecialityDto;
  @IsString()
  description: string;
  @IsNumber()
  experience: number;
  @IsNumber()
  price: number;
}
