import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import{JwtService} from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'


@Injectable()
export class AuthService {

    constructor(private userService:UserService , private jwtService:JwtService ){}



    async validateUser(username:string , password:string){
        try{
        const userObj = await this.userService.getUser({username:username} , 'username _id password')
        const validationResult =  await bcrypt.compare(password , userObj.password)
        
        if(validationResult){
            // console.log(userObj);
            
            return userObj
        }
        return null
    }catch(error){
        throw new HttpException(error.message , HttpStatus.NOT_FOUND)
    }
    }

    login(user:any){
        const payload = {username:user.username , sub:user._id}
        
        return {acces_token:this.jwtService.sign(payload)}
    }
}
