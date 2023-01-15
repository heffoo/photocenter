import { Exclude, Expose } from 'class-transformer';
import { IsEnum, IsString } from 'class-validator';

@Exclude()
export class CreateTaskDto {
  @Expose()
  @IsString()
  title: string;
}
