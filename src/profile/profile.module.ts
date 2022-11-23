import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[UserModule , AuthModule],
  providers: [ProfileService , ],
  controllers: [ProfileController]
})
export class ProfileModule {}
