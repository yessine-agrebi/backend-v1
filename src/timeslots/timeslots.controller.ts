import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TimeslotsService } from './timeslots.service';


@Controller('timeslots')
export class TimeslotsController {
  constructor(private readonly timeslotsService: TimeslotsService) {}

  @Get(':availabilityId')
  findByAvailabilityId(@Param('availabilityId') availabilityId: number) {
    return this.timeslotsService.findTimeslotsByAvailabilityId(availabilityId);
  }

  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeslotsService.remove(+id);
  }
}
