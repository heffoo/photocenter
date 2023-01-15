import { Employee } from 'src/modules/employees/entities/employee.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  status: string;

  @Column()
  creatorId: string;

  @Column()
  executorId: string;

  @ManyToOne(() => Employee, (employee) => employee.createdTasks)
  creator: Employee;

  @ManyToOne(() => Employee, (employee) => employee.executedTasks)
  executor: Employee;
}
