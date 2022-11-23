import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose'
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt'
import { Follower } from './types/follower.type';
@Injectable()
export class UserService {

constructor(@InjectModel('User') private userModel:Model<User&Document>){}

    getAllFollowers(userId:string , skip:number):Promise<any>{

        return this.userModel.find().limit(20).skip(skip).exec()
    }

    getUser(findingOption:any , selectedProperties?:string):Promise<User>{
        return this.userModel.findOne({findingOption}).select(selectedProperties).exec()
    }


    async createUser(userData:User){
        const user = await this.userModel.findOne({username:userData.username})
        
        if(!user){
            userData.password = await bcrypt.hash(userData.password , 10)
            
             return this.userModel.create(userData)
        }
        throw new HttpException('User already exists !' , HttpStatus.BAD_REQUEST)
    }

    updateUserInfo(){

    }

}
