import { OffensiveWordRepository } from './../src/domain/repositories/offensive-word.repository';
import 'reflect-metadata';
import { addOffensiveWords } from './helpers/offensive-word';
import { logger } from './../src/infrastructure/config/logger';

import { createPost } from './helpers/posts';
import { createAuthor } from './helpers/author';
import { getPublisherToken, getAdminToken, getOtherPublisherToken } from './helpers/auth';

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

    beforeAll(async () => {
        await connectToDB();
        await sequelize.authenticate();
    });

    it('publisher should add commment to post', async() => {

        const publisherToken = await getPublisherToken();

        await createAuthor();

        const idPost = await createPost();

        const nicknameComment = 'Cervantes';
        const contentComment = 'Me ha parecido una obra fundamental en la historia de la literatura, enhorabuena al autor, creo que me suena.';
        logger.debug(`This is postId: ${idPost}`);
        await server.put(`/api/posts/${idPost}/comment`).type('application/json')
            .set('Authorization', `Bearer ${publisherToken}`)
            .send({nicknameComment, contentComment})
            .expect(200);

    });

    it('publisher should not add commment to post with offensive word', async() => {

        const publisherToken = await getPublisherToken();

        await addOffensiveWords();

        await createAuthor();

        const idPost = await createPost();

        const nicknameComment = 'Cervantes';
        const contentComment = 'Me ha parecido una obra de Caca absoluta en la historia de la literatura, enhorabuena al autor, creo que me suena.';

        await server.put(`/api/posts/${idPost}/comment`).type('application/json')
            .set('Authorization', `Bearer ${publisherToken}`)
            .send({nicknameComment, contentComment})
            .expect(400);

    });

    it('admin should add commment to post', async() => {

        const adminToken = await getAdminToken();

        await createAuthor();

        const idPost = await createPost();

        const nicknameComment = 'Cervantes';
        const contentComment = 'Me ha parecido una obra fundamental en la historia de la literatura, enhorabuena al autor, creo que me suena.';
        logger.debug(`This is postId: ${idPost}`);
        await server.put(`/api/posts/${idPost}/comment`).type('application/json')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({nicknameComment, contentComment})
            .expect(200);

    });

    it('publisher should delete commment to post', async() => {

        const publisherToken = await getPublisherToken();

        await createAuthor();

        const idPost = await createPost();

        const nicknameComment = 'Cervantes';
        const contentComment = 'Me ha parecido una obra fundamental en la historia de la literatura, enhorabuena al autor, creo que me suena.';
        logger.debug(`This is postId: ${idPost}`);
        const response = await server.put(`/api/posts/${idPost}/comment`).type('application/json')
            .set('Authorization', `Bearer ${publisherToken}`)
            .send({nicknameComment, contentComment})
            .expect(200);

        logger.debug(`Response add comment ${JSON.stringify(response.body)}`);

        const idComment = response.body.idComment;
        await server.delete(`/api/posts/${idPost}/comment/${idComment}`).type('application/json')
            .set('Authorization', `Bearer ${publisherToken}`)
            .expect(200);

    });

    it('publisher should not delete commment to post of the other publisher', async() => {

        const publisherToken = await getPublisherToken();
        const otherPublisherToken = await getOtherPublisherToken();

        await createAuthor();

        const idPost = await createPost();

        const nicknameComment = 'Cervantes';
        const contentComment = 'Me ha parecido una obra fundamental en la historia de la literatura, enhorabuena al autor, creo que me suena.';
        logger.debug(`This is postId: ${idPost}`);
        const response = await server.put(`/api/posts/${idPost}/comment`).type('application/json')
            .set('Authorization', `Bearer ${publisherToken}`)
            .send({nicknameComment, contentComment})
            .expect(200);

        logger.debug(`Response add comment ${JSON.stringify(response.body)}`);

        const idComment = response.body.idComment;
        await server.delete(`/api/posts/${idPost}/comment/${idComment}`).type('application/json')
            .set('Authorization', `Bearer ${otherPublisherToken}`)
            .expect(403);

    });

    it('admin should delete commment to post of the other publisher', async() => {

        const otherPublisherToken = await getOtherPublisherToken();
        const adminToken = await getAdminToken();
        
        await createAuthor();

        const idPost = await createPost();

        const nicknameComment = 'Cervantes';
        const contentComment = 'Me ha parecido una obra fundamental en la historia de la literatura, enhorabuena al autor, creo que me suena.';
        logger.debug(`This is postId: ${idPost}`);
        const response = await server.put(`/api/posts/${idPost}/comment`).type('application/json')
            .set('Authorization', `Bearer ${otherPublisherToken}`)
            .send({nicknameComment, contentComment})
            .expect(200);

        logger.debug(`Response add comment ${JSON.stringify(response.body)}`);

        const idComment = response.body.idComment;
        await server.delete(`/api/posts/${idPost}/comment/${idComment}`).type('application/json')
            .set('Authorization', `Bearer ${adminToken}`)
            .expect(200);

    });

    afterEach(async () => {
        const repoPosts: PostRepository = Container.get('PostRepository');
        await repoPosts.deleteAll();

        const repoAuthor: AuthorRepository = Container.get('AuthorRepository');
        await repoAuthor.deleteAll();

        const repoOffensiveWord: OffensiveWordRepository = Container.get('OffensiveWordRepository');
        await repoOffensiveWord.deleteAll();

        const repoUser: UserRepository = Container.get('UserRepository');
        await repoUser.deleteAll();
    });

    afterAll(async () => {
        disconnectDB();
        await sequelize.close();
    });

});