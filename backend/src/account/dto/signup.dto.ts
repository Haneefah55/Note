import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator'

export class SignupDto {

  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: "username should be at least 3 character"})
  name: string;

  @IsEmail()
  @IsNotEmpty({message: "Email field should not be empty"})
  email: string;


  @MinLength(8, { message: "Password should be at least 8 character"})
  @IsNotEmpty()
  @IsString()
  password: string;

  
  
}