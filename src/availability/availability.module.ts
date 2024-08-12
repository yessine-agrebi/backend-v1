import { Module } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { AvailabilityController } from './availability.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Availability } from './entities/availability.entity';
import { TutorsModule } from 'src/tutors/tutors.module';
import { TimeslotsModule } from 'src/timeslots/timeslots.module';

@Module({
  imports: [TypeOrmModule.forFeature([Availability]), TutorsModule, TimeslotsModule],
  controllers: [AvailabilityController],
  providers: [AvailabilityService],
  exports: [AvailabilityService],
})
export class AvailabilityModule {}
