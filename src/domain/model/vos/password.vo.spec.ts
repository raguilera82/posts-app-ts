import {PasswordVO} from './password.vo';

describe('Password VO', () => {

    it('should create', () => {

        const validPassword = 'password';
        const passwordVO = PasswordVO.create(validPassword);

        expect(passwordVO.value).toEqual(validPassword);

    });

});