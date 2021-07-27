import { EmailVO } from '../vos/email.vo';
import { IdVO } from '../vos/id.vo';
import { PasswordVO } from '../vos/password.vo';
import {User, UserType} from './user.entity';

describe('User', () => {

    it('should create', () => {
        const userData: UserType = {
            id: IdVO.create(),
            email: EmailVO.create('hola@hola.com'),
            password: PasswordVO.create('password')
        };

        const user = new User(userData);

        expect(user.id.value).toEqual(userData.id.value);
        expect(user.email.value).toEqual(userData.email.value);
        expect(user.password.value).toEqual(userData.password.value);
    });

});