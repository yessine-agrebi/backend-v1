import { Type } from "class-transformer";
import { UserDto } from "src/users/dtos/user.dto";

export class AvailabilityDto {
    day: string;
    startTime: string;
    endTime: string;
    @Type(() => UserDto)
    user: UserDto;
}