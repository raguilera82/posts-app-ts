import { UserRepository } from './../src/domain/repositories/user.repository';
import 'reflect-metadata';

import { Role, RoleVO } from './../src/domain/model/vos/role.vo';
import { User, UserType } from './../src/domain/model/entities/user.entity';
import { UserService } from './../src/domain/services/user.service';


import { AuthorRepository } from './../src/domain/repositories/author.repository';
import { PostRepository } from './../src/domain/repositories/post.repository';
import { Author, AuthorType } from './../src/domain/model/entities/author.entity';

import { AuthorService } from './../src/domain/services/author.service';
import { Container } from 'typedi';

import supertest from 'supertest';
import app from '../src/app';
import { connectToDB, disconnectDB } from '../src/infrastructure/config/mongo';
import sequelize from '../src/infrastructure/config/postgresql';
import { IdVO } from '../src/domain/model/vos/id.vo';
import { NameAuthorVO } from '../src/domain/model/vos/name-author.vo';
import { NicknameVO } from '../src/domain/model/vos/nickname.vo';
import { PasswordVO } from '../src/domain/model/vos/password.vo';
import { EmailVO } from '../src/domain/model/vos/email.vo';

describe('Posts', () => {

    const server: supertest.SuperTest<supertest.Test> = supertest(app);
    let publisherToken = '';

    beforeAll(async () => {
        await connectToDB();
        await sequelize.authenticate();

        const userService: UserService = Container.get(UserService);
        const userData: UserType = {
            id: IdVO.create(),
            email: EmailVO.create('publisher@example.org'),
            password: PasswordVO.create('password'),
            role: RoleVO.create(Role.PUBLISHER)
        };
        await userService.persist(new User(userData));

        const responseLogin = await server.post('/api/login').type('application/json')
            .send({email: 'publisher@example.org', password: 'password'}).expect(200);
        publisherToken = responseLogin.body.token;

    });

    afterEach(async () => {
        const repoPosts: PostRepository = Container.get('PostRepository');
        await repoPosts.deleteAll();

        const repoAuthor: AuthorRepository = Container.get('AuthorRepository');
        await repoAuthor.deleteAll();
    });

    describe('Create', () => {
        it('should create post', async () => {

            const authorService = Container.get(AuthorService);
            const idAuthor = IdVO.create();
            const authorData: AuthorType = {
                id: idAuthor,
                name: NameAuthorVO.create('Miguel de Cervantes'),
                nickname: NicknameVO.create('Cervantes')
            };
            await authorService.create(new Author(authorData));

            const createPostRequest = {
                authorNickname: 'Cervantes',
                content: 'En un lugar de la Mancha de cuyo nombre no quiero acordarme...',
                title: 'El Quijote'
            };
            await server.post('/api/posts').type('application/json')
                .set('Authorization', `Bearer ${publisherToken}`)
                .send(createPostRequest).expect(201);
        
        });

        it('should 404 not author found', async () => {
            const createPostRequest = {
                authorNickname: 'Cervantes',
                content: 'En un lugar de la Mancha de cuyo nombre no quiero acordarme...',
                title: 'El Quijote'
            };
            await server.post('/api/posts').type('application/json')
                .set('Authorization', `Bearer ${publisherToken}`)
                .send(createPostRequest).expect(404);
        });

        it('should bad request 400', async () => {
            const createPostRequest = {
                content: 'En un lugar de la Mancha de cuyo nombre no quiero acordarme...',
                title: 'El Quijote'
            };
            await server.post('/api/posts').type('application/json')
                .set('Authorization', `Bearer ${publisherToken}`)
                .send(createPostRequest).expect(400);
        });
    });

    

    afterAll(async () => {
        disconnectDB();
        const repoUser: UserRepository = Container.get('UserRepository');
        await repoUser.deleteAll();
        await sequelize.close();
    });

});