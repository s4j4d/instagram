
import { IsNotEmpty, IsString } from "class-validator"






export class DeleteReplyDto {

    @IsNotEmpty()
    @IsString()
    postId: string

    @IsNotEmpty()
    @IsString()
    commentId: string

    @IsNotEmpty()
    @IsString()
    replyId: string
}



export class DeleteReplyLikeDto extends DeleteReplyDto{}