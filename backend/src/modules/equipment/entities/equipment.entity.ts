import { Task } from 'src/modules/tasks/entities/task.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Equipment {
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

  @ManyToMany(() => Task, (task) => task.equipment)
  tasks: Array<Task>;
}
