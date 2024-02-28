import { Module } from '@nestjs/common';
import { TutorsService } from './tutors.service';
import { TutorsController } from './tutors.controller';

@Module({
  controllers: [TutorsController],
  providers: [TutorsService],
})
export class TutorsModule {}
