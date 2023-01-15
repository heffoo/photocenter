import { PartialType } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsUUID } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

@Exclude()
export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @Expose()
  @IsUUID(4)
  @IsOptional()
  executorId?: string;
}
