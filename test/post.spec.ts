import { createAuthor } from './helpers/author';
import 'reflect-metadata';


import { getPublisherToken } from './helpers/auth';
import { UserRepository } from './../src/domain/repositories/user.repository';
import { AuthorRepository } from './../src/domain/repositories/author.repository';
import { PostRepository } from './../src/domain/repositories/post.repository';
import { Container } from 'typedi';

import supertest from 'supertest';
import app from '../src/app';
import { connectToDB, disconnectDB } from '../src/infrastructure/config/mongo';
import sequelize from '../src/infrastructure/config/postgresql';

describe('Posts', () => {

    const server: supertest.SuperTest<supertest.Test> = supertest(app);
    let publisherToken = '';

    beforeAll(async () => {
        await connectToDB();
        await sequelize.authenticate();
        publisherToken = await getPublisherToken();
    });

    afterEach(async () => {
        const repoPosts: PostRepository = Container.get('PostRepository');
        await repoPosts.deleteAll();

        const repoAuthor: AuthorRepository = Container.get('AuthorRepository');
        await repoAuthor.deleteAll();
    });

    describe('Create', () => {
        it('should create post', async () => {

            await createAuthor();

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