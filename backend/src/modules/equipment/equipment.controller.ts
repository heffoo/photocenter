import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParamId } from 'src/common/dto/base.dto';

@ApiTags('equipment')
@ApiHeader({
  name: 'consumerusername',
  description: 'Username of consumer',
})
@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @ApiOperation({
    summary: 'Create equipment',
  })
  @Post()
  create(@Body() createEquipmentDto: CreateEquipmentDto) {
    return this.equipmentService.create(createEquipmentDto);
  }

  @ApiOperation({
    summary: 'Get equipment list',
  })
  @Get()
  findAll() {
    return this.equipmentService.findAll();
  }

  @ApiOperation({
    summary: 'Get equipment by id',
  })
  @Get(':id')
  findOne(@Param() params: ParamId) {
    return this.equipmentService.findOne(params.id);
  }

  @ApiOperation({
    summary: 'Update equipment by id',
  })
  @Patch(':id')
  update(
    @Param() params: ParamId,
    @Body() updateEquipmentDto: UpdateEquipmentDto,
  ) {
    return this.equipmentService.update(params.id, updateEquipmentDto);
  }

  @ApiOperation({
    summary: 'Delete equipment by id',
  })
  @Delete(':id')
  remove(@Param() params: ParamId) {
    return this.equipmentService.remove(params.id);
  }
}
