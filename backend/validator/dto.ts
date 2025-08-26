// signup.dto.ts
import { IsEmail, IsString, MinLength } from "class-validator";

export class SignupDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @MinLength(6, { message: "Password must be at least 6 characters" })
  password!: string;

  @IsString() role!: string;
}

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}
