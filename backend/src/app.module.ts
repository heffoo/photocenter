import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'node:path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PositionModule } from './modules/position/position.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: path.join(process.cwd(), 'database.sq3'),
      autoLoadEntities: true,
      synchronize: true,
    }),
    PositionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
