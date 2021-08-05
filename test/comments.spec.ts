import { logger } from './../src/infrastructure/config/logger';
import 'reflect-metadata';

import { createPost } from './helpers/posts';
import { createAuthor } from './helpers/author';
import { getPublisherToken, getAdminToken } from './helpers/auth';

import supertest from 'supertest';
import Container from 'typedi';
import { AuthorRepository } from '../src/domain/repositories/author.repository';
import { PostRepository } from '../src/domain/repositories/post.repository';
import { UserRepository } from '../src/domain/repositories/user.repository';
import { connectToDB, disconnectDB } from '../src/infrastructure/config/mongo';
import sequelize from '../src/infrastructure/config/postgresql';
import app from '../src/app';


describe('Comments', () => {

    const server: supertest.SuperTest<supertest.Test> = supertest(app);
    let publisherToken = '';
    let adminToken = '';

    beforeAll(async () => {
        await connectToDB();
        await sequelize.authenticate();
        publisherToken = await getPublisherToken();
        adminToken = await getAdminToken();
    });

    it('publisher should add commment to post', async() => {

        await createAuthor();

        const idPost = await createPost();

        const nicknameComment = 'Cervantes';
        const contentComment = 'Me ha parecido una obra fundamental en la historia de la literatura, enhorabuena al autor, creo que me suena.';
        logger.debug(`This is postId: ${idPost}`);
        await server.put(`/api/posts/${idPost}/comment`).type('application/json')
            .set('Authorization', `Bearer ${publisherToken}`)
            .send({nicknameComment, contentComment})
            .expect(201);

    });

    it('admin should add commment to post', async() => {

        await createAuthor();

        const idPost = await createPost();

        const nicknameComment = 'Cervantes';
        const contentComment = 'Me ha parecido una obra fundamental en la historia de la literatura, enhorabuena al autor, creo que me suena.';
        logger.debug(`This is postId: ${idPost}`);
        await server.put(`/api/posts/${idPost}/comment`).type('application/json')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({nicknameComment, contentComment})
            .expect(201);

    });

    it('publisher should delete commment to post', async() => {

        await createAuthor();

        const idPost = await createPost();

        const nicknameComment = 'Cervantes';
        const contentComment = 'Me ha parecido una obra fundamental en la historia de la literatura, enhorabuena al autor, creo que me suena.';
        logger.debug(`This is postId: ${idPost}`);
        const response = await server.put(`/api/posts/${idPost}/comment`).type('application/json')
            .set('Authorization', `Bearer ${publisherToken}`)
            .send({nicknameComment, contentComment})
            .expect(201);

        logger.debug(`Response add comment ${JSON.stringify(response.body)}`);

        const idComment = response.body.idComment;
        await server.delete(`/api/posts/${idPost}/comment/${idComment}`).type('application/json')
            .set('Authorization', `Bearer ${publisherToken}`)
            .expect(200);

    });

    
    afterEach(async () => {
        const repoPosts: PostRepository = Container.get('PostRepository');
        await repoPosts.deleteAll();

        const repoAuthor: AuthorRepository = Container.get('AuthorRepository');
        await repoAuthor.deleteAll();
    });

    afterAll(async () => {
        disconnectDB();
        const repoUser: UserRepository = Container.get('UserRepository');
        await repoUser.deleteAll();
        await sequelize.close();
    });

});