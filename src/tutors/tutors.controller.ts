import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TutorsService } from './tutors.service';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutor.dto';
import { TutorDto } from './dto/tutor.dto';

@Controller('tutors')
export class TutorsController {
  constructor(private readonly tutorsService: TutorsService) {}

  @Get()
  findAll() {
    return this.tutorsService.findAllTutors();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tutorsService.findOneTutor(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() tutorDto: TutorDto) {
    return this.tutorsService.updateTutor(id, tutorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tutorsService.removeTutor(id);
  }
}
