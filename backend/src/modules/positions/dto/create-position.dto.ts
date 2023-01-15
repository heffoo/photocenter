import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class CreatePositionDto {
  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsString()
  description: string;
}
