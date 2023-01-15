import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class CreateEquipmentDto {
  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsString()
  description: string;
}
