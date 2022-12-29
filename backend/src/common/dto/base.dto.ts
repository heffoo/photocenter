import { Exclude, Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';

@Exclude()
export class ParamId {
  @Expose()
  @IsUUID(4)
  id: string;
}
