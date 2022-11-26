import { IsNotEmpty, IsOptional } from "class-validator"



export class CommentreactionDto {

    

    @IsOptional()
    text:string

    @IsOptional()
    like: boolean

    @IsNotEmpty()
    postId:string

    @IsNotEmpty()
    commentId:string


    @IsOptional()
    userId:string

}



export class CommentreactionPlusUserIdDto extends CommentreactionDto{
    @IsNotEmpty()
    userId:string

}
