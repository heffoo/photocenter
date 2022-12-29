import e from 'express';
import { Employee } from 'src/modules/employees/entities/employee.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Position {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => Employee, (employee) => employee.position)
  employees: Array<Employee>;
}
