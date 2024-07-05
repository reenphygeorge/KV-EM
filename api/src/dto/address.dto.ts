import { IsNotEmpty, IsString } from "class-validator";

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  line1: string;

  @IsString()
  @IsNotEmpty()
  pincode: string;
}

export class UpdateAddressDto {
  @IsString()
  @IsNotEmpty()
  line1: string;

  @IsString()
  @IsNotEmpty()
  pincode: string;
}
