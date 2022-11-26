import { PartialType } from "@nestjs/mapped-types"
import { IsEnum, IsNotEmpty, IsOptional, IS_ENUM } from "class-validator"



export class ReplyreactionDto {

    

    @IsOptional()
    text:string

    @IsOptional()
    like: boolean

    @IsNotEmpty()
    postId:string

    @IsNotEmpty()
    commentId:string

    @IsNotEmpty()
    replyId:string


    @IsOptional()
    userId:string

}

export class ReplyreactionPlusUserIdDto extends ReplyreactionDto{
    @IsNotEmpty()
    userId:string

}

