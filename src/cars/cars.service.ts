import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';
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
    const car = await this.carRepository.findOneBy({ id });

    if (!car) {
      throw new BadRequestException('Car not found');
    }

    let owner;
    if (updateCarDto.owner) {
      owner = await this.ownerRepository.findOneBy({
        name: updateCarDto.owner,
      });

      if (!owner) {
        throw new BadRequestException('Owner not found');
      }
    }

    const data = await this.carRepository.save({
      ...car,
      ...updateCarDto,
      owner,
    });

    return { data: data };
  }

  async remove(id: number) {
    const car = await this.carRepository.findOneBy({ id });

    if (!car) {
      throw new BadRequestException('Car not found');
    }

    const data = await this.carRepository.softDelete(id);

    return { data: data };
  }
}
