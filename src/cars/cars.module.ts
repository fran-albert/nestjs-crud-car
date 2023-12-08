import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { OwnersModule } from 'src/owners/owners.module';
import { OwnersService } from 'src/owners/owners.service';

@Module({
  imports: [TypeOrmModule.forFeature([Car]), OwnersModule],
  controllers: [CarsController],
  providers: [CarsService, OwnersService],
})
export class CarsModule {}
