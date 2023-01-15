import { Task } from 'src/modules/tasks/entities/task.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Equipment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToMany(() => Task, (task) => task.equipment)
  tasks: Array<Task>;
}
