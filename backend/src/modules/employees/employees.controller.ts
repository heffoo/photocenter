import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParamId } from 'src/common/dto/base.dto';

@ApiTags('employees')
@ApiHeader({
  name: 'consumerUsername',
  description: 'Username of consumer',
})
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @ApiOperation({
    summary: 'Create employee',
  })
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @ApiOperation({
    summary: 'Get all employees',
  })
  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @ApiOperation({
    summary: 'Get employee by id',
  })
  @Get(':id')
  findOne(@Param() params: ParamId) {
    return this.employeesService.findOne(params.id);
  }

  @ApiOperation({
    summary: 'Update employee by id',
  })
  @Patch(':id')
  update(
    @Param() params: ParamId,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.update(params.id, updateEmployeeDto);
  }

  @ApiOperation({
    summary: 'Delete employee by id',
  })
  @Delete(':id')
  remove(@Param() params: ParamId) {
    return this.employeesService.remove(params.id);
  }
}
