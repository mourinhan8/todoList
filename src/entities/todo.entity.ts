import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { TodoStatus } from '../types/todo';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    type: "text",
    default: TodoStatus.DOING
  })
  status: TodoStatus;

  @Column({ type: "date", nullable: true })
  startDate?: string;

  @Column({ type: "date", nullable: true })
  endDate?: string;

  @CreateDateColumn({ type: "datetime" })
  createdAt: Date;

  @UpdateDateColumn({ type: "datetime" })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  setStartDate() {
    if (this.endDate && !this.startDate) {
      this.startDate = this.endDate;
    }
  }
}
