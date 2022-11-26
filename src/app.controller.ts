import { Body, Controller, Get, HttpException, Post, UseGuards , Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local.guard';
import { LocalStrategy } from './auth/local.strategy';
import { Public } from './auth/public.decorator';
import { User } from './user/schemas/user.schema';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(private userService: UserService ,private authService:AuthService) { }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }
  
  @Post('register')
  async register(@Request() req, @Body() userdData: User) {
      try{
      const user = await this.userService.createUser(userdData)
      if (user)
          return {
              message: 'user created successfuly !',
              data: user
          }
      }catch(error){
          
          throw new HttpException(error.message, error.status)
      }
  }
}
