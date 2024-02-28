import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { AvailabilityDto } from 'src/availability/dto/availability.dto';
import { SpecialityDto } from 'src/specialities/dto/speciality.dto';
import { UserDto } from 'src/users/dtos/user.dto';

export class TutorDto extends UserDto {
  @Type(() => SpecialityDto)
  speciality: SpecialityDto;

  @Type(() => AvailabilityDto)
  availabilities: AvailabilityDto[];

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  experience: number;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  rating: number;
}
