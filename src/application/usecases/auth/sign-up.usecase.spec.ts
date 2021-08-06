jest.mock('./../../../infrastructure/repositories/user.repository.pg', () => {
    return {
        UserRepositoryPG: jest.fn().mockImplementation(() => {
            return {
                save: jest.fn()
            };
        })
    };
});

import 'reflect-metadata';
import { SignUpUseCase, SignUpRequest } from './sign-up.usecase';
import { Container } from 'typedi';
import { UserRepositoryPG } from './../../../infrastructure/repositories/user.repository.pg';
describe('Sign Up', () => {

    it ('should execute use case', async () => {

        const repository = new UserRepositoryPG();
        Container.set('UserRepository', repository);
        const useCase: SignUpUseCase = Container.get(SignUpUseCase);
        const request: SignUpRequest = {
            email: 'hola@hola.com',
            password: 'password'
        };
        await useCase.execute(request);
        expect(repository.save).toHaveBeenCalled();

    });

});