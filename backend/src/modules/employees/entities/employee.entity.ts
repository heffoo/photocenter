import { Position } from 'src/modules/positions/entities/position.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  positionId: string;

  @ManyToOne(() => Position, (position) => position.employees)
  position: Position;
}
