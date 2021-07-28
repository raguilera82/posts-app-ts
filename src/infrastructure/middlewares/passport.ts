import { EmailVO } from './../../domain/model/vos/email.vo';
import { Container } from 'typedi';
import { UserService } from './../../domain/services/user.service';
import {Strategy, ExtractJwt , StrategyOptions} from 'passport-jwt';

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret'
};

export default new Strategy(opts, async (payload, done) => {
    try {

        const {email} = payload;
        const userService = Container.get(UserService);
        const user = await userService.getByEmail(EmailVO.create(email));
        if (user) {
            return done(null, user);
        }
        return done(null, false, {message: 'User not found'});

    }catch(err) {
        console.log(err);
    }
    
});