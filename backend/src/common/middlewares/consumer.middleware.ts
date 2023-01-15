import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction, Request } from 'express';
import { Employee } from 'src/modules/employees/entities/employee.entity';
import {
  DEFAULT_POSITION_TITLE,
  Position,
} from 'src/modules/positions/entities/position.entity';
import { Repository } from 'typeorm';

interface ConsumerRequest extends Request {
  consumer: Employee;
  headers: Request['headers'] & { consumerusername: string };
}

@Injectable()
export class ConsumerMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,
  ) {}

  async use(req: ConsumerRequest, res: Response, next: NextFunction) {
    const { consumerusername: consumerUsername } = req.headers;

    if (!consumerUsername) {
      throw new UnauthorizedException();
    }

    let consumer = await this.employeeRepository.findOneBy({
      username: consumerUsername,
    });

    if (!consumer) {
      const position = await this.positionRepository.findOneBy({
        title: DEFAULT_POSITION_TITLE,
      });

      consumer = await this.employeeRepository.create({
        username: consumerUsername,
        firstname: '',
        lastname: '',
        positionId: position.id,
      });

      await this.employeeRepository.save(consumer);
    }

    req.consumer = consumer;

    next();
  }
}
