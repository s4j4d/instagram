import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { Schema } from 'inspector';
import { Document, Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { RequestUserObjectType } from 'src/user/types/request.user.type';
import { UserService } from 'src/user/user.service';
import { CommentreactionPlusUserIdDto } from './dto/comment.reaction.dto';
import { DeleteCommentDto, DeleteCommentLikeDto } from './dto/delete.comment.dto';
import { DeletePostDto, DeletePostLikeDto } from './dto/delete.post.dto';
import { DeleteReplyDto, DeleteReplyLikeDto } from './dto/delete.reply.dto';
import { PostreactionDto, PostreactionPlusUserIdDto } from './dto/post.reaction.dto';
import { ReplyreactionPlusUserIdDto } from './dto/reply.reaction.dto';
import { PostClass } from './schemas/post.schema';

@Injectable()
export class PostService {
    constructor(@InjectModel('PostClass') private postModel: Model<PostClass, Document>, private userService: UserService) {

    }
    getAllUserPosts(userData: any): Promise<any> {

        return this.postModel.find({ userId: userData.userId }).exec()
    }

    async createPost(userId: string, postData: PostClass): Promise<PostClass> {
        return await this.postModel.create({
            userId: userId, caption: postData.caption, pictures: postData.pictures
            , tagPeople: postData.tagPeople, location: postData.location
        })
    }

    getPost(postId: string): Promise<PostClass & Document | null> {
        return this.postModel.findOne({ _id: postId }).exec()
    }

    async addCommentAndLikeToPost(data: PostreactionPlusUserIdDto) {
        const post = await this.getPost(data.postId)
        post.comments.push({ text: data.text, user: data.userId })
        if (data.like)
            post.likes.push(data.userId)
        await post.save()
        return post
    }
    async addReplyAndLikeToComment(data: CommentreactionPlusUserIdDto) {
        try {
            const post = await this.postModel.updateOne({ _id: data.postId }, {
                '$push': {
                    'comments.$[i].replies': {

                        text: data.text, user: data.userId
                    },
                    'comments.$[i].likes':
                        data.like ? data.userId : null

                }
            }, { arrayFilters: [{ 'i._id': data.commentId }] })

            return post
        } catch (error) {
            throw new HttpException(error.message, 400)
        }

    }
    async addLikeToReply(data: ReplyreactionPlusUserIdDto) {
        try {
            const post = await this.postModel.updateOne({ _id: data.postId }, {
                '$push': {
                    'comments.replies.$[i].likes':
                        data.like ? data.userId : null
                }
            }, { arrayFilters: [{ 'i._id': data.replyId }] })

            return post
        } catch (error) {
            throw new HttpException(error.message, 400)
        }
    }

    async deletePost(user: RequestUserObjectType, data: DeletePostDto) {
        const post = await this.getPost(data.postId)
        if (post.userId == user.userId)
            return await this.postModel.deleteOne({ _id: data.postId })
        else
            throw new UnauthorizedException()
    }

    async deleteComment(user: RequestUserObjectType, data: DeleteCommentDto) {
        const comment = await this.postModel.findOne({
            _id: data.postId,
            'comments': { $elemMatch: { _id: data.commentId } }
        })
        if (comment.userId == user.userId)
            return this.postModel.updateOne({ _id: data.postId },
                {
                    $pull: {
                        'comments': {
                            _id: data.commentId
                        }

                    }
                })
        else
            throw new UnauthorizedException()
    }

    async deleteReply(user: RequestUserObjectType, data: DeleteReplyDto) {
        const reply = await this.postModel.findOne({ 'comments': { $elemMatch: { _id: data.commentId, 
            'replies._id': data.replyId } } }, { 'comments.$': 1})

        if (reply.comments[0].replies[0].user== user.userId)
            return this.postModel.updateOne({ _id: data.postId },
                {
                    $pull: {
                        'comments.$[comment].replies': {
                            _id: data.replyId
                        }
                    }
                }, {
                arrayFilters: [{ 'comment._id': data.commentId }]
            })
        else
            throw new UnauthorizedException()
    }

    // async deletePostLike(user: RequestUserObjectType, data: DeletePostLikeDto) {
    //     const userObj = await this.userService.getUser({ username: user.username }, 'username')
    //     if (userObj.username)
    //         return this.postModel.updateOne({ _id: data.postId },
    //             {
    //                 $pull: {
    //                     'likes': 
    //                 }
    //             }, {
    //             arrayFilters: [{ 'comment._id': data.commentId }]
    //         })
    // }

    // async deleteReplyLike(userId: string, data: DeleteCommentLikeDto) {
    //     const userObj = await this.userService.getUser({ username: username }, 'username')
    //     if (userObj.username)
    //         return this.postModel.updateOne({ _id: data.postId },
    //             {
    //                 $pull: {
    //                     'comments.$[comment].replies': {
    //                         _id: data.replyId
    //                     }
    //                 }
    //             }, {
    //             arrayFilters: [{ 'comment._id': data.commentId }]
    //         })
    // }

    // async deleteCommentLike(userId: string, data: DeleteReplyLikeDto) {
    //     const userObj = await this.userService.getUser({ username: username }, 'username')
    //     if (userObj.username)
    //         return this.postModel.updateOne({ _id: data.postId },
    //             {
    //                 $pull: {
    //                     'comments.$[comment].replies': {
    //                         _id: data.replyId
    //                     }
    //                 }
    //             }, {
    //             arrayFilters: [{ 'comment._id': data.commentId }]
    //         })
    // }
    // getAllRecentPosts(userId:string):Promise<>{
    //     return this.userService.getAllFollowers()
    // }

}
