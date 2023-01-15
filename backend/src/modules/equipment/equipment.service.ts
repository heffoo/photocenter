import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { Equipment } from './entities/equipment.entity';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,
  ) {}

  async create(createEquipmentDto: CreateEquipmentDto) {
    const newEquipment = this.equipmentRepository.create(createEquipmentDto);

    await this.equipmentRepository.save(newEquipment);

    return newEquipment;
  }

  findAll() {
    return this.equipmentRepository.find();
  }

  async findOne(id: string) {
    const equipment = await this.equipmentRepository.findOneBy({ id });

    if (!equipment) {
      throw new NotFoundException();
    }

    return equipment;
  }

  async update(id: string, updateEquipmentDto: UpdateEquipmentDto) {
    const equipment = await this.equipmentRepository.findOneBy({ id });

    if (!equipment) {
      throw new NotFoundException();
    }

    Object.assign(equipment, updateEquipmentDto);
    await this.equipmentRepository.save(equipment);

    return equipment;
  }

  async remove(id: string) {
    const equipment = await this.equipmentRepository.findOne({ where: { id }, relations: ['tasks'] });

    if (!equipment) {
      throw new NotFoundException();
    }

    return this.equipmentRepository.remove(equipment);
  }
}
