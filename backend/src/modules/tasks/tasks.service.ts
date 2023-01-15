import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  async create(consumerId: string, createTaskDto: CreateTaskDto) {
    const newTask = this.tasksRepository.create({
      ...createTaskDto,
      creatorId: consumerId,
      status: 'scheduled',
    });

    await this.tasksRepository.save(newTask);

    return newTask;
  }

  findAll() {
    return this.tasksRepository.find({
      relations: ['executor'],
    });
  }

  async findOne(id: string) {
    const task = await this.tasksRepository.findOneBy({ id });

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  async update(consumerId: string, id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.tasksRepository.findOneBy({ id });

    if (!task) {
      throw new NotFoundException();
    }

    if (task.creatorId !== consumerId) {
      throw new ForbiddenException();
    }

    Object.assign(task, updateTaskDto);

    await this.tasksRepository.save(task);

    return task;
  }

  async remove(consumerId: string, id: string) {
    const task = await this.tasksRepository.findOneBy({ id });

    if (!task) {
      throw new NotFoundException();
    }

    if (task.creatorId !== consumerId) {
      throw new ForbiddenException();
    }

    await this.tasksRepository.remove(task);
  }
}
