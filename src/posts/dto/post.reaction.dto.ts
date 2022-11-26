import { PartialType } from "@nestjs/mapped-types"
import { IsEnum, IsNotEmpty, IsOptional, IS_ENUM } from "class-validator"



export class PostreactionDto {

    

    @IsOptional()
    text:string

    @IsOptional()
    like: boolean

    @IsNotEmpty()
    postId:string

    @IsOptional()
    userId:string

}

export class PostreactionPlusUserIdDto extends PostreactionDto{
    @IsNotEmpty()
    userId:string

}

