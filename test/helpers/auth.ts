import { UserRepository } from './../../src/domain/repositories/user.repository';
import supertest from 'supertest';
import Container from 'typedi';
import app from '../../src/app';
import { UserType, User } from '../../src/domain/model/entities/user.entity';
import { EmailVO } from '../../src/domain/model/vos/email.vo';
import { IdVO } from '../../src/domain/model/vos/id.vo';
import { PasswordVO } from '../../src/domain/model/vos/password.vo';
import { RoleVO, Role } from '../../src/domain/model/vos/role.vo';
import { UserService } from '../../src/domain/services/user.service';

export const getAdminToken = async (): Promise<string> => {
    return getToken('admin@example.org', 'password', Role.ADMIN);
};

export const getPublisherToken = async (): Promise<string> => {
    return getToken('publisher@example.org', 'password', Role.PUBLISHER);
};

export const resetUsers = async () => {
    const repoUser: UserRepository = Container.get('UserRepository');
    await repoUser.deleteAll();
};

export const getToken = async (email: string, pass: string, role: Role): Promise<string> => {
    const userService = Container.get(UserService);
    const userData: UserType = {
        email: EmailVO.create(email),
        password: PasswordVO.create(pass),
        id: IdVO.create(),
        role: RoleVO.create(role)
    };

    await userService.persist(new User(userData));

    const server = supertest(app);
    const responseLogin = await server.post('/api/login').type('application/json')
        .send({email: email, password: pass});
    return responseLogin.body.token;
};

