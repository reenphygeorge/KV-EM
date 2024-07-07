import {
  IsEmail,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import Address from "../entity/address.entity";
import { CreateAddressDto, UpdateAddressDto } from "./address.dto";
import { Exclude, Type } from "class-transformer";
import { Role } from "../utils/role.enum";
import Department from "../entity/department.entity";
import { CreateDepartmentDto } from "./department.dto";

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: Address;

  @ValidateNested()
  @Type(() => CreateDepartmentDto)
  department: Department;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(Role)
  role: Role;
}

export class EmployeeResponseDto extends CreateEmployeeDto {
  @Exclude()
  password: string;
}

export class LoginEmployeeDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateEmployeeDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsNumber()
  @IsOptional()
  age: number;

  @ValidateNested()
  @IsOptional()
  @Type(() => UpdateAddressDto)
  address: Address;
}
