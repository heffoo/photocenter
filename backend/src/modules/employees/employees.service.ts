import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  DEFAULT_POSITION_TITLE,
  Position,
} from '../positions/entities/position.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const position = await this.positionRepository.findOneBy({
      title: DEFAULT_POSITION_TITLE,
    });
    const employee = this.employeeRepository.create({
      ...createEmployeeDto,
      positionId: position.id,
    });
    await this.employeeRepository.save(employee);
    return employee;
  }

  findAll() {
    return this.employeeRepository.find({
      relations: ['position'],
    });
  }

  async findOne(id: string) {
    const employee = await this.employeeRepository.findOneBy({ id });
    if (!employee) {
      throw new NotFoundException();
    }
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = await this.employeeRepository.findOneBy({ id });
    if (!employee) {
      throw new NotFoundException();
    }
    await this.employeeRepository.save({ ...employee, ...updateEmployeeDto });
    return employee;
  }

  async remove(id: string) {
    const employee = await this.employeeRepository.findOneBy({ id });
    if (!employee) {
      throw new NotFoundException();
    }
    return this.employeeRepository.remove(employee);
  }
}
