import { Controller, Get, Post, Body, BadRequestException, HttpException, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { AccountService } from './account.service';
import { SignupDto } from './dto/signup.dto'
import { LoginDto } from './dto/login.dto';



@UsePipes(new ValidationPipe())
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  async getAllUser(){
    return this.accountService.getAllUsers()

  }
  
  @Post("signup")
  async signupUser(@Body() data: SignupDto){

  const result = this.accountService.signUpUser(data)

    return result
  }

  @Post("login")
  async loginUser(@Body() data: LoginDto){
    return this.accountService.loginUser(data)
  }
  
}
