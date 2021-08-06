import { Author, AuthorType } from './../../src/domain/model/entities/author.entity';
import { AuthorService } from './../../src/domain/services/author.service';
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
import { NameAuthorVO } from '../../src/domain/model/vos/name-author.vo';
import { NicknameVO } from '../../src/domain/model/vos/nickname.vo';

export const getAdminToken = async (): Promise<string> => {
    return getToken('admin@example.org', 'password', Role.ADMIN);
};

export const getPublisherToken = async (): Promise<string> => {
    return getToken('publisher@example.org', 'password', Role.PUBLISHER, 'Cervantes');
};

export const getOtherPublisherToken = async ():Promise<string> => {
    return getToken('otherPublisher@example.org', 'password', Role.PUBLISHER, 'other');
};

export const resetUsers = async ():Promise<void> => {
    const repoUser: UserRepository = Container.get('UserRepository');
    await repoUser.deleteAll();
};

export const getToken = async (email: string, pass: string, role: Role, name = 'other'): Promise<string> => {
    const userService = Container.get(UserService);
    const userId = IdVO.create();
    const userData: UserType = {
        email: EmailVO.create(email),
        password: PasswordVO.create(pass),
        id: userId,
        role: RoleVO.create(role)
    };

    await userService.persist(new User(userData));

    if (Role.PUBLISHER) {

        const authorService = Container.get(AuthorService);
        const authorData: AuthorType = {
            id: userId,
            name: NameAuthorVO.create(name),
            nickname: NicknameVO.create(name)
        };
        authorService.create(new Author(authorData));

    }

    const server = supertest(app);
    const responseLogin = await server.post('/api/login').type('application/json')
        .send({email: email, password: pass});
    return responseLogin.body.token;
};

