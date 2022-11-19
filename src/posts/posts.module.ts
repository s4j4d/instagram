import { Module } from '@nestjs/common';
import { ProfileModule } from './profile/profile.module';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

@Module({
  imports: [ProfileModule],
  providers: [PostsService],
  controllers: [PostsController]
})
export class PostsModule {}
