import { PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { CreateTaskDto } from './create-task.dto';

@Exclude()
export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
