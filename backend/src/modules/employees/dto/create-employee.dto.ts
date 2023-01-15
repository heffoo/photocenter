import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsString, IsUUID } from 'class-validator';

@Exclude()
export class CreateEmployeeDto {
  @Expose()
  @IsString()
  @IsOptional()
  firstname?: string;

  @Expose()
  @IsString()
  @IsOptional()
  lastname?: string;

  @Expose()
  @IsUUID()
  @IsOptional()
  positionId?: string;
}
