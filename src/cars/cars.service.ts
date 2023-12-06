import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
  ) {}

  async create(createCarDto: CreateCarDto) {
    if (!createCarDto.brand) {
      return 'Brand is required';
    }

    const data = await this.carRepository.save(createCarDto);

    return data;
  }

  async findAll() {
    const data = await this.carRepository.find();

    return { data: data };
  }

  async findOne(id: number) {
    const data = await this.carRepository.findOneBy({ id });

    if (!data) {
      return 'Data not found';
    }

    return { data: data };
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    if (!updateCarDto.brand) {
      return 'Brand is required';
    }

    const data = await this.carRepository.update(id, updateCarDto);

    return { data: data, message: 'Car updated successfully' };
  }

  async remove(id: number) {
    const dataFind = await this.carRepository.findOneBy({ id });

    if (!dataFind) {
      return 'Data not found';
    }

    const data = await this.carRepository.softDelete(id);

    return { data: data, message: 'Car deleted successfully' };
  }
}
