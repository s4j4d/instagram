import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/post.module';
import { ProfileModule } from './profile/profile.module';
import { UserModule } from './user/user.module';
import {ConfigModule} from '@nestjs/config'
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local.guard';
import { LocalStrategy } from './auth/local.strategy';
@Module({
  imports: [UserModule , PostsModule , ProfileModule , AuthModule,
  ConfigModule.forRoot(),
  MongooseModule.forRoot(process.env.MONGO_URI) , PassportModule],
  controllers: [AppController],
  providers: [AppService , LocalAuthGuard , LocalStrategy],
})
export class AppModule {}

