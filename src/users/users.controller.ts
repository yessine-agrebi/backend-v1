import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dtos/user.dto';

@Controller('users')
export class UsersController {
    constructor (
        private usersService: UsersService
    ) {}
    @Get()
    findAll() {
        return this.usersService.findAllUsers() ;
    }

    @Get(':id')
    findOne(id: number) {
        return this.usersService.findOneUser(id);
    }
    @Patch(':id')
    update(@Param('id') id: number, @Body() user: UserDto) {
        return this.usersService.updateUser(id, user);
    }

}
