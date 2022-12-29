import { PartialType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';
import { CreatePositionDto } from './create-position.dto';

@Exclude()
export class UpdatePositionDto extends PartialType(CreatePositionDto) {}
