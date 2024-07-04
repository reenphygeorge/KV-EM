import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Address from "./address.entity";

@Entity()
export default class Employee extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @OneToOne(() => Address, (address) => address.employee, {
    cascade: true,
    onDelete: "CASCADE",
  })
  address: Address;
}
