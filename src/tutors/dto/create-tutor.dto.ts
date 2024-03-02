import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { AvailabilityDto } from 'src/availability/dto/availability.dto';
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
