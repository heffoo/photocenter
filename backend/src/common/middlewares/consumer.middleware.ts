import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction, Request } from 'express';
import { Employee } from 'src/modules/employees/entities/employee.entity';
import { Repository } from 'typeorm';

interface ConsumerRequest extends Request {
  consumer: Employee;
  headers: Request["headers"] & { consumerUsername: string };
}

@Injectable()
export class ConsumerMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async use(req: ConsumerRequest, res: Response, next: NextFunction) {
    const { consumerUsername } = req.headers;

    if (!consumerUsername) {
      throw new UnauthorizedException();
    }

    let consumer = await this.employeeRepository.findOneBy({
      username: consumerUsername,
    });

    if (!consumer) {
      consumer = await this.employeeRepository.create({
        username: consumerUsername,
      });

      await this.employeeRepository.save(consumer);
    }

    req.consumer = consumer;

    next();
  }
}
