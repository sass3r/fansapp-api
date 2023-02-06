import { Strategy as JwtStr, StrategyOptions, ExtractJwt } from 'passport-jwt';
import { PayloadToken } from '../models/auth.interface';
import { PassportUse } from '../utils/passport.use';
import * as dotenv from 'dotenv';

export class JwtStrategy{

    constructor() {
        dotenv.config();
    }

    async validate(payload: PayloadToken, done: any) {
        return done(null, payload)
    }

    get use() {
        return PassportUse<
            JwtStr, 
            StrategyOptions, 
            (payload: PayloadToken, done: any) => Promise<PayloadToken> 
        >(
            'jwt',
            JwtStr,
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: process.env.JWT_SECRET,
            },
            this.validate
        );
    }
}