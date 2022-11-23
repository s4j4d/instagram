import { Injectable } from '@nestjs/common';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { Schema } from 'inspector';
import { Document, Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { PostClass } from './schemas/post.schema';

@Injectable()
export class PostService {
constructor(@InjectModel('PostClass') private  postModel: Model<PostClass ,Document> , private userService:UserService){
    
}
getAllUserPosts(userId:string):Promise<any> {
    
    return this.postModel.find({_id:userId},{limit:5}).exec()
}

createPost(userId:string , postData:PostClass):Promise<PostClass>{
    return this.postModel.create({userId:postData.userId,caption:postData.caption , pictures:postData.pictures 
        , tagPeople:postData.tagPeople , location:postData.location})
}

getPost(postId:string):Promise<PostClass | null>{
    return this.postModel.findOne({_id:postId}).exec()
}

// getAllRecentPosts(userId:string):Promise<>{
//     return this.userService.getAllFollowers()
// }

addComment(comment:string){
    
}
}
