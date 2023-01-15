import e from 'express';
import { Employee } from 'src/modules/employees/entities/employee.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export const DEFAULT_POSITION_TITLE = 'shop-assistant';
export const DEFAULT_POSITION_DESCRIPTION = 'Продавец-консультант';

@Entity()
export class Position {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true,
  })
  title: string;

  @Column({
    nullable: true,
  })
  description: string;

  @OneToMany(() => Employee, (employee) => employee.position)
  employees: Array<Employee>;
}
