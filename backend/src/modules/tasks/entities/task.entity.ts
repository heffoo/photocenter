import { Employee } from 'src/modules/employees/entities/employee.entity';
import { Equipment } from 'src/modules/equipment/entities/equipment.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Column({
    nullable: true,
  })
  executorId: string | null;

  @ManyToOne(() => Employee, (employee) => employee.createdTasks)
  creator: Employee;

  @ManyToOne(() => Employee, (employee) => employee.executedTasks)
  executor: Employee;

  @ManyToMany(() => Equipment, (equipment) => equipment.tasks)
  @JoinTable()
  equipment: Array<Equipment>;
}
