import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostsController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostClass, PostSchema } from './schemas/post.schema';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Module({
  imports: [MongooseModule.forFeature([{ name: PostClass.name, schema: PostSchema }]) ,UserModule],
  providers: [PostService , JwtStrategy],
  controllers: [PostsController]
})
export class PostsModule { }
