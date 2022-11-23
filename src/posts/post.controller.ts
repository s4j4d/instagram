import { Controller , Get , Post, UseGuards , Request, Body} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { PostService } from './post.service';
import { PostClass } from './schemas/post.schema';

@UseGuards(AuthGuard('jwt'))
@Controller('post')
export class PostsController {

    constructor(private postService:PostService){}

    @Get('list')
    async getAllPost(@Request() req):Promise<[PostClass]>{
        return await this.postService.getAllUserPosts(req.validationResult)
    }

    @Post('create')
    async createPost(@Request() req , @Body() postData:PostClass){
        console.log(req);
        
        return await this.postService.createPost(req.user.sub,postData)
                 

    }
}
