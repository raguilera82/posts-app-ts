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
    const userService = Container.get(UserService);
    const userData: UserType = {
        email: EmailVO.create('admin@example.org'),
        password: PasswordVO.create('password'),
        id: IdVO.create(),
        role: RoleVO.create(Role.ADMIN)
    };

    await userService.persist(new User(userData));

    const server = supertest(app);
    const responseLogin = await server.post('/api/login').type('application/json')
        .send({email: 'admin@example.org', password: 'password'});
    return responseLogin.body.token;
};

export const resetUsers = async () => {
    const repoUser: UserRepository = Container.get('UserRepository');
    await repoUser.deleteAll();
};