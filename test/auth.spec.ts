import { resetAuthors } from './helpers/author';
import 'reflect-metadata';

import { logger } from './../src/infrastructure/config/logger';
import { getAdminToken, resetUsers } from './helpers/auth';
import supertest from 'supertest';
import app from '../src/app';
import { connectToDB, disconnectDB } from '../src/infrastructure/config/mongo';
import sequelize from '../src/infrastructure/config/postgresql';

describe('Auth', () => {

    const server: supertest.SuperTest<supertest.Test> = supertest(app);
    let adminToken = '';

    beforeAll(async() => {
        await connectToDB();
        await sequelize.authenticate();

        adminToken = await getAdminToken();

    });

    afterAll(async () => {
        await resetAuthors();
        disconnectDB();

        await resetUsers();
        await sequelize.close();
    });


    it('should sign up author with role PUBLISHER', async () => {
        logger.debug(`Admin token ${adminToken}`);
        return await server.post('/api/sign-up-author').type('application/json')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({email: 'author@example.org', password: 'password', 
                nameAuthor: 'Federico', nicknameAuthor: 'Fede'}).expect(201);

    });

    it('should 400 bad request, email empty', async () => {

        logger.debug(`Admin token ${adminToken}`);
        await server.post('/api/sign-up-author').type('application/json')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({password: 'password', 
                nameAuthor: 'Federico', nicknameAuthor: 'Fede'}).expect(400);

    });

});