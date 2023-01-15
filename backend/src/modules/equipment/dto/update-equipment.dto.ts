import { PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { CreateEquipmentDto } from './create-equipment.dto';

@Exclude()
export class UpdateEquipmentDto extends PartialType(CreateEquipmentDto) {}
