import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';
import { ServiceResponse } from '../utils/service-response';
import { Owner } from 'src/owners/entities/owner.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,

    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>,
  ) {}

  async create(createCarDto: CreateCarDto) {
    const owner = await this.ownerRepository.findOneBy({
      name: createCarDto.owner,
    });

    if (!owner) {
      throw new BadRequestException('Owner not found');
    }

    const data = await this.carRepository.save({
      ...createCarDto,
      owner,
    });

    return { data: data };
  }

  async findAll() {
    const data = await this.carRepository.find();

    return { data: data };
  }

  async findOne(id: number) {
    const data = await this.carRepository.findOneBy({ id });

    if (!data) {
      throw new BadRequestException('Data not found');
    }

    return { data: data };
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    // if (!updateCarDto.brand) {
    //   return new ServiceResponse(false, 'Brand is required');
    // }

    // const updateResult = await this.carRepository.update(id, updateCarDto);
    // if (updateResult.affected === 0) {
    //   return new ServiceResponse(false, 'No car found with the given id');
    // }

    // const updatedCar = await this.carRepository.findOneBy({ id });
    return new ServiceResponse(true, 'Car updated successfully');
  }

  async remove(id: number) {
    const car = await this.carRepository.findOneBy({ id });

    if (!car) {
      throw new BadRequestException('Car not found');
    }

    await this.carRepository.softDelete(id);

    return new ServiceResponse(true, 'Car deleted successfully');
  }
}
