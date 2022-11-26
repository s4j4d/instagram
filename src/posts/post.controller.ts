import { Controller, Get, Post, UseGuards, Request, Body, Delete, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CommentreactionDto } from './dto/comment.reaction.dto';
import { DeleteCommentDto } from './dto/delete.comment.dto';
import { DeletePostDto, DeletePostLikeDto } from './dto/delete.post.dto';
import { DeleteReplyDto } from './dto/delete.reply.dto';
import { PostreactionDto } from './dto/post.reaction.dto';
import { ReplyreactionDto } from './dto/reply.reaction.dto';
import { PostService } from './post.service';
import { PostClass } from './schemas/post.schema';

@UseGuards(AuthGuard('jwt'))
@Controller('post')
export class PostsController {

    constructor(private postService: PostService) { }

    @Get('list')
    async getAllPost(@Request() req): Promise<[PostClass]> {
        return await this.postService.getAllUserPosts(req.user)
    }

    // postclass is both dto and schema for posts in mongoose
    @Post('create')
    async createPost(@Request() req, @Body() postData: PostClass) {

        return await this.postService.createPost(req.user.userId, postData)

    }

    @Patch('post-reaction')
    async reactionOnPost(@Request() req, @Body() postReactionData: PostreactionDto) {
        postReactionData.userId = req.user.userId
        return await this.postService.addCommentAndLikeToPost(postReactionData)
    }

    @Patch('comment-reaction')
    async reactionOnComment(@Request() req, @Body() commentReactionData: CommentreactionDto) {
        commentReactionData.userId = req.user.userId
        return await this.postService.addReplyAndLikeToComment(commentReactionData)
    }

    @Patch('reply-reaction')
    async reactionOnReply(@Request() req, @Body() replyReactionData: ReplyreactionDto) {
        replyReactionData.userId = req.user.userId
        return await this.postService.addLikeToReply(replyReactionData)
    }


    @Delete('delete-post')
    async deletePost(@Request() req, @Body() data: DeletePostDto) {
        return await this.postService.deletePost(req.user, data)
    }

    @Delete('delete-comment')
    async deleteComment(@Request() req, @Body() data: DeleteCommentDto) {
        return await this.postService.deleteComment(req.user, data)
    }

    @Delete('delete-reply')
    async deleteReply(@Request() req, @Body() data: DeleteReplyDto) {
        return await this.postService.deleteReply(req.user, data)
    }

    // @Delete('delete-post-like')
    // async deletePostLike(@Request() req, @Body() data: DeletePostLikeDto){
    //     return await this.postService.deletePostLike(req.user.username , data)
    // }

    // @Delete('delete-comment-like')
    // async deleteCommentLike(@Request() req, @Body() data: DeletePostLikeDto){
    //     return await this.postService.deleteCommentLike(req.user.username , data)
    // }

    // @Delete('delete-reply-like')
    // async deleteReplyLike(@Request() req, @Body() data: DeletePostLikeDto){
    //     return await this.postService.deleteReplyLike(req.user.username , data)
    // }
}
