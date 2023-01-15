import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'node:path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PositionsModule } from './modules/positions/positions.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { TaskModule } from './modules/tasks/tasks.module';
import { ConsumerMiddleware } from './common/middlewares/consumer.middleware';
import { Employee } from './modules/employees/entities/employee.entity';
import { EquipmentModule } from './modules/equipment/equipment.module';
import { Position } from './modules/positions/entities/position.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: path.join(process.cwd(), 'database.sq3'),
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Employee, Position]),
    PositionsModule,
    EmployeesModule,
    TaskModule,
    EquipmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ConsumerMiddleware).forRoutes('*');
  }
}
