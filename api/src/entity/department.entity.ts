import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Employee from "./employee.entity";

@Entity()
export default class Department extends AbstractEntity {
  @Column()
  name: string;

  @OneToMany(() => Employee, ({ department }) => department)
  employee: Employee[];
}
