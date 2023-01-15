import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PositionsService } from './positions.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParamId } from 'src/common/dto/base.dto';

@ApiTags('positions')
@ApiHeader({
  name: 'consumerusername',
  description: 'Username of consumer',
})
@Controller('positions')
export class PositionsController {
  constructor(private readonly positionService: PositionsService) {}

  @ApiOperation({
    summary: 'Create position',
  })
  @Post()
  create(@Body() createPositionDto: CreatePositionDto) {
    return this.positionService.create(createPositionDto);
  }

  @ApiOperation({
    summary: 'Get all positions',
  })
  @Get()
  findAll() {
    return this.positionService.findAll();
  }

  @ApiOperation({
    summary: 'Get position by id',
  })
  @Get(':id')
  findOne(@Param() params: ParamId) {
    return this.positionService.findOne(params.id);
  }

  @ApiOperation({
    summary: 'Update position by id',
  })
  @Patch(':id')
  update(
    @Param() params: ParamId,
    @Body() updatePositionDto: UpdatePositionDto,
  ) {
    return this.positionService.update(params.id, updatePositionDto);
  }

  @ApiOperation({
    summary: 'Delete position by id',
  })
  @Delete(':id')
  remove(@Param() params: ParamId) {
    return this.positionService.remove(params.id);
  }
}
