import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Employee from "./employee.entity";

@Entity()
export default class Address extends AbstractEntity {
  @Column()
  line1: string;

  @Column()
  line2: string;

  @Column()
  flatOrPhoneNo: string;

  @OneToOne(() => Employee, (employee) => employee.address)
  @JoinColumn()
  employee: Employee;
}
