import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { scryptSync } from 'crypto';
import { CreateTutorDto } from 'src/tutors/dto/create-tutor.dto';
import { TutorDto } from 'src/tutors/dto/tutor.dto';
import { Tutor } from 'src/tutors/entities/tutor.entity';
import { TutorsService } from 'src/tutors/tutors.service';
import { RegisterUserDto } from 'src/users/dtos/register.dto';
import { UserDto } from 'src/users/dtos/user.dto';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/users/roles';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tutorsService: TutorsService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string; user: UserDto | TutorDto }> {
    let userOrTutor: User | Tutor;

    const user = await this.usersService.findByEmail(email);
    if (user) {
      userOrTutor = user;
    } else {
      const tutor = await this.tutorsService.findByEmail(email);
      if (!tutor) {
        throw new NotFoundException('User not found');
      }
      userOrTutor = tutor;
    }

    const [salt, storedHash] = userOrTutor.password.split('.');
    const hash = scryptSync(pass, salt, 32) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new Error('Incorrect password');
    }
    const payload = {
      email: userOrTutor.email,
      firstname: userOrTutor.firstName,
      lastName: userOrTutor.lastName,
      role: userOrTutor.role,
      sub: userOrTutor.userId,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: userOrTutor,
    };
  }

  async register(user: User | Tutor, profilePicture: Express.Multer.File): Promise<User | Tutor> {
    console.log(profilePicture)
    const userExists = await this.usersService.findByEmail(user.email);
    if (userExists) {
      throw new Error('User already exists');
    } else {
      const tutorExists = await this.tutorsService.findByEmail(user.email);
      if (tutorExists) {
        throw new Error('Tutor already exists');
      }
    }
    if ('speciality' in user) {
      // User is a Tutor
      const tutorDto: CreateTutorDto = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        role: Role.TUTOR,
        speciality: user.speciality,
        description: user.description,
        experience: user.experience,
        price: user.price,
        phone: user.phone,
        profilePicture: user.profilePicture,
      };
      return this.tutorsService.createTutor(tutorDto);
    } else {
      // User is a regular User
      const userDto: RegisterUserDto = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        role: Role.USER,
        phone: user.phone,
        profilePicture: user.profilePicture,
      };
      return this.usersService.createUser(userDto);
    }
  }
}
