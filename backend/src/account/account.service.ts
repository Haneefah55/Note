import { Injectable, BadRequestException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service'
import { Prisma } from '../../generated/prisma/client';
import { auth } from '../lib/auth';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';




@Injectable()
export class AccountService {
  constructor(private database: DatabaseService){}
  
  async signUpUser(data: SignupDto){

    try {
      const { name, email, password } = data
      
      const result = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password
      }
      })
      return ({ success: true, message: "Account created successfully"})
    } catch (error: any) {
      console.log(error)
      return ({ success: false, message: error.message})
    }
    
    
  }

  async loginUser(data: LoginDto){

    try {
      const { email, password } = data
      if(!email || !password){
        throw new BadRequestException("Invalid Credentials")
      }
      
      const result = await auth.api.signInEmail({
        body: {
          email,
          password
        }
        
      })

     return { success: true, message: "Login in successfully", data: result.user }
    } catch (error) {
      const response = error?.message
      
      console.log("login error response", response)
    return { success: false, message: response, data: null }
    }
  }

  async getAllUsers(){
    try {
      const result = await this.database.user.findMany()

      return({ success: true, data: result })
    } catch (error) {
      console.log(error)
      const result= {}
      return ({success: false, data: result, message: error.message})
    }
  }

  
}
