import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

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

}
