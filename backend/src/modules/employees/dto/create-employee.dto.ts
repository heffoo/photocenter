import { Exclude, Expose } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';

@Exclude()
export class CreateEmployeeDto {
  @Expose()
  @IsString()
  firstName: string;

  @Expose()
  @IsString()
  lastName: string;

  @Expose()
  @IsUUID()
  positionId: string;
}
