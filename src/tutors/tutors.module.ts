import { Module, forwardRef } from '@nestjs/common';
import { TutorsService } from './tutors.service';
import { TutorsController } from './tutors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tutor } from './entities/tutor.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tutor]), forwardRef(() => AuthModule)],
  controllers: [TutorsController],
  exports: [TutorsService, TypeOrmModule],
  providers: [TutorsService],
})
export class TutorsModule {}
