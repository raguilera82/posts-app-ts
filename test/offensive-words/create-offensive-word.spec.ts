import { UserRepository } from './../../src/domain/repositories/user.repository';
import { OffensiveWordRepository } from './../../src/domain/repositories/offensive-word.repository';
import { Container } from 'typedi';
import { logger } from './../../src/infrastructure/config/logger';
import { OffensiveWordResponse } from './../../src/application/usecases/offensive-word.response';
import request from 'supertest';
import { OffensiveWordModel } from '../../src/infrastructure/repositories/offensive-word.schema';
import app from './../../src/app';
import { connectToDB, disconnectDB } from './../../src/infrastructure/config/mongo';
import { UserService } from '../../src/domain/services/user.service';
import { User, UserType } from '../../src/domain/model/entities/user.entity';
import { EmailVO } from '../../src/domain/model/vos/email.vo';
import { IdVO } from '../../src/domain/model/vos/id.vo';
import { PasswordVO } from '../../src/domain/model/vos/password.vo';
import { RoleVO, Role } from '../../src/domain/model/vos/role.vo';
import sequelize from './../../src/infrastructure/config/postgresql';

describe('Offensive word', () => {

    const server: request.SuperTest<request.Test> = request(app);
    let adminToken = '';

    beforeAll(async () => {
        await connectToDB();
        await sequelize.authenticate();

        const userService = Container.get(UserService);
        const userData: UserType = {
            email: EmailVO.create('admin@example.org'),
            password: PasswordVO.create('password'),
            id: IdVO.create(),
            role: RoleVO.create(Role.ADMIN)
        };

        await userService.persist(new User(userData));

        const responseLogin = await server.post('/api/login').type('application/json').send({email: 'admin@example.org', password: 'password'});
        adminToken = responseLogin.body.token;
        logger.info(adminToken);
    });

    afterEach(async () => {
        const repo: OffensiveWordRepository = Container.get('OffensiveWordRepository');
        await repo.deleteAll();
    });

    it('should create', async () => {

        const newOffensiveWord = {
            word: 'Supertest',
            level: 3
        };
        const response = await server.post('/api/offensive-word').type('application/json')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(newOffensiveWord).expect(201);
        const { id } = response.body as OffensiveWordResponse;
        logger.info(id);

        const result = await OffensiveWordModel.findOne({word: 'Supertest'}).exec();
        logger.info(result);
    });
    
    afterAll(async () => {
        disconnectDB();
        const repoUser: UserRepository = Container.get('UserRepository');
        await repoUser.deleteAll();
        await sequelize.close();
    });

});