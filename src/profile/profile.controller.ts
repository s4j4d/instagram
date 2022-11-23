import { Body, Controller, Post, UseGuards, Request, HttpException, HttpStatus, Get } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { LocalStrategy } from 'src/auth/local.strategy';
import { Public } from 'src/auth/public.decorator';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';



@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
    constructor(private userService: UserService ,private authService:AuthService) { }



    @Get()
    getUserProfile(){

    }
}
