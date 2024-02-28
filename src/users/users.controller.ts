import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dtos/user.dto';
import { RegisterUserDto } from './dtos/register.dto';

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
    @Post()
    create(@Body() user: RegisterUserDto) {
        return this.usersService.createUser(user);
    }
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.usersService.removeUser(id);
    }

}
