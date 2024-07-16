import {
  IsDateString,
  IsEmail,
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
import { CreateDepartmentDto, UpdateDepartmentNoIdDto } from "./department.dto";
import { Status } from "../utils/status.enum";

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(Role)
  role: Role;

  @IsEnum(Status)
  status: Status;

  @IsNumber()
  @IsNotEmpty()
  experience: number;

  @IsDateString()
  @IsNotEmpty()
  joinDate: Date;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: Address;

  @ValidateNested()
  @Type(() => CreateDepartmentDto)
  department: Department;
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
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  @IsNumber()
  @IsOptional()
  experience?: number;

  @IsDateString()
  @IsOptional()
  joinDate?: Date;

  @ValidateNested()
  @IsOptional()
  @Type(() => UpdateAddressDto)
  address?: Address;

  @ValidateNested()
  @IsOptional()
  @Type(() => UpdateDepartmentNoIdDto)
  department?: Department;
}
