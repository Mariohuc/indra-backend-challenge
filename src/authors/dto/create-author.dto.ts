import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateAuthorDto {
  @IsString()
  firstName: string
  @IsString()
  lastName: string
  @IsEmail()
  @IsNotEmpty()
  email: string
}