import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { Position } from './entities/position.entity';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,
  ) {}

  async create(createPositionDto: CreatePositionDto) {
    const position = this.positionRepository.create(createPositionDto);
    await this.positionRepository.save(position);
    return position;
  }

  findAll() {
    return this.positionRepository.find();
  }

  async findOne(id: string) {
    const position = await this.positionRepository.findOneBy({ id });
    if (!position) {
      throw new NotFoundException();
    }
    return position;
  }

  async update(id: string, updatePositionDto: UpdatePositionDto) {
    const position = await this.positionRepository.findOneBy({ id });
    await this.positionRepository.save({ ...position, ...updatePositionDto });
    return position;
  }

  async remove(id: string) {
    const position = await this.positionRepository.findOneBy({ id });
    if (!position) {
      throw new NotFoundException();
    }
    return this.positionRepository.remove(position);
  }
}
