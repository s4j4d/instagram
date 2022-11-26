import { IsNotEmpty, IsString } from "class-validator";




export class DeletePostDto {

    @IsNotEmpty()
    @IsString()
    postId: string
}


export class DeletePostLikeDto extends DeletePostDto {}