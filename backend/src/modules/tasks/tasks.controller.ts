import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ParamId } from 'src/common/dto/base.dto';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Consumer } from 'src/common/decorators/consumer.decorator';
import { Employee } from '../employees/entities/employee.entity';

@ApiTags('tasks')
@ApiHeader({
  name: 'consumerusername',
  description: 'Username of consumer',
})
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({
    summary: 'Create task',
  })
  @Post()
  create(@Consumer() consumer: Employee, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(consumer.id, createTaskDto);
  }

  @ApiOperation({
    summary: 'Get all tasks',
  })
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @ApiOperation({
    summary: 'Get task by id',
  })
  @Get(':id')
  findOne(@Param() params: ParamId) {
    return this.tasksService.findOne(params.id);
  }

  @ApiOperation({
    summary: 'Update task by id',
  })
  @Patch(':id')
  update(
    @Consumer() consumer: Employee,
    @Param() params: ParamId,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(consumer.id, params.id, updateTaskDto);
  }

  @ApiOperation({
    summary: 'Delete task by id',
  })
  @Delete(':id')
  remove(@Consumer() consumer: Employee, @Param() params: ParamId) {
    return this.tasksService.remove(consumer.id, params.id);
  }
}
