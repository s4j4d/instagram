import { IsNotEmpty, IsString } from "class-validator";




export class RequestUserObjectType{

    @IsNotEmpty()
    @IsString()
    username:string

    @IsNotEmpty()
    @IsString()
    userId:string
}