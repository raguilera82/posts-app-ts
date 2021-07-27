jest.mock('./../../infrastructure/repositories/user.repository.pg', () => {
    return {
        UserRepositoryPG: jest.fn().mockImplementation(() => {
            return {
                getByEmail: jest.fn().mockImplementation(() => null)
            };
        })
    };
});



import 'reflect-metadata';
import { UserRepositoryPG } from './../../infrastructure/repositories/user.repository.pg';
import { SignInUseCase, SignInRequest } from './sign-in.usecase';
import { Container } from 'typedi';
describe('Sign In', () => {

    it('should throw user not found exception', async () => {
        const repository = new UserRepositoryPG();
        Container.set('UserRepository', repository);
        const useCase = Container.get(SignInUseCase);
        const request: SignInRequest = {
            email: 'hola@hola.com',
            password: 'password'
        };
        try {
            await useCase.execute(request);
        }catch(err) {
            expect(err.code).toBe(404);
        }
    });

});