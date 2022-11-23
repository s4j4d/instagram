import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from 'passport-local'
import { AuthService } from "./auth.service";





@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){

    constructor(private authService:AuthService){
        super()
    }

    async validate(username:string , password:string):Promise<any>{
        // console.log(username);
        // console.log(password);
        const user = await this.authService.validateUser(username , password)
        // console.log(validateResult);
        
        if(user)
            return  user
        else   
            throw new HttpException('username or password nor correct !' , HttpStatus.UNAUTHORIZED)
            
    }
}