import { Strategy, ExtractJwt } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { JwtService } from '@nestjs/jwt'

console.log(process.env.SECRET_KEY);



export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private jwtService: JwtService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey:process.env.SECRET_KEY
        })
    }

    validate(payload: any) {
        return { username: payload.username, sub: payload.sub }
    }
}