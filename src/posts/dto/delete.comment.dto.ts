import { IsNotEmpty, IsString } from "class-validator"





export class DeleteCommentDto {

    @IsNotEmpty()
    @IsString()
    postId: string

    @IsNotEmpty()
    @IsString()
    commentId: string
}

export class DeleteCommentLikeDto extends DeleteCommentDto{} 