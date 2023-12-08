import { Injectable } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>,
  ) {}

  async create(createOwnerDto: CreateOwnerDto) {
    return await this.ownerRepository.save(createOwnerDto);
  }

  async findAll() {
    return await this.ownerRepository.find();
  }

  async findOne(id: number) {
    return `This action returns a #${id} owner`;
  }

  async update(id: number, updateOwnerDto: UpdateOwnerDto) {
    return `This action updates a #${id} owner`;
  }

  async remove(id: number) {
    return `This action removes a #${id} owner`;
  }
}
