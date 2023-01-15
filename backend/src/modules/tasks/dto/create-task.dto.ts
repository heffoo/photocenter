import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

@Exclude()
export class CreateTaskDto {
  @Expose()
  @IsString()
  @IsOptional()
  title?: string;
}
