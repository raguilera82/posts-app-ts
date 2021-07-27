import {EmailVO} from './email.vo';

describe('Email VO', () => {

    it('should create', () => {

        const validEmail = 'hola@hola.com';
        const emailVO = EmailVO.create(validEmail);

        expect(emailVO.value).toEqual(validEmail);

    });

});