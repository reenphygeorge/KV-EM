import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { EmployeeResponseDto } from "./employee.dto";
import { Exclude, Type } from "class-transformer";
import Employee from "../entity/employee.entity";

export class CreateDepartmentDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
export class UpdateDepartmentNoIdDto {
  @IsString()
  @IsOptional()
  name?: string;
}

export class UpdateDepartmentDto extends UpdateDepartmentNoIdDto {
  @IsNumber()
  id: number;
}
UpdateDepartmentDto;

export class DepartmentResponseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateNested()
  @IsOptional()
  @Type(() => EmployeeResponseDto)
  employee: EmployeeResponseDto;
}