import { Container } from 'typedi';
import { UserService } from './../../domain/services/user.service';
import {Strategy, ExtractJwt , StrategyOptions} from 'passport-jwt';
import { IdVO } from '../../domain/model/vos/id.vo';

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret'
};

export default new Strategy(opts, async (payload, done) => {
    try {

        const {id} = payload;
        const userService = Container.get(UserService);
        const user = await userService.getById(IdVO.createWithUUID(id));
        if (user) {
            return done(null, user);
        }
        return done(null, false, {message: 'User not found'});

    }catch(err) {
        console.log(err);
    }
    
});