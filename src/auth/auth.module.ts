import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import * as bcrypt from 'bcrypt'
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtAuthGuard } from './jwt.guard';
import { LocalAuthGuard } from './local.guard';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[ConfigModule.forRoot(),
            UserModule,
    PassportModule.register({defaultStrategy:'jwt'}),
            JwtModule.register({
              signOptions:{
                expiresIn: '1h'
            },
            secret:process.env.SECRET_KEY
            })],
  providers: [AuthService ,LocalAuthGuard ,JwtAuthGuard],
  exports:[AuthService , JwtAuthGuard , LocalAuthGuard  ]
})
export class AuthModule {}

