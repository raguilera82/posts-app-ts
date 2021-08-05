import { getAdminToken } from './../helpers/auth';
import { UserRepository } from '../../src/domain/repositories/user.repository';
import { OffensiveWordRepository } from '../../src/domain/repositories/offensive-word.repository';
import { Container } from 'typedi';
import { logger } from '../../src/infrastructure/config/logger';
import { OffensiveWordResponse } from '../../src/application/usecases/offensive-word.response';
import request from 'supertest';
import app from '../../src/app';
import { connectToDB, disconnectDB } from '../../src/infrastructure/config/mongo';
import { UserService } from '../../src/domain/services/user.service';
import { User, UserType } from '../../src/domain/model/entities/user.entity';
import { EmailVO } from '../../src/domain/model/vos/email.vo';
import { IdVO } from '../../src/domain/model/vos/id.vo';
import { PasswordVO } from '../../src/domain/model/vos/password.vo';
import { RoleVO, Role } from '../../src/domain/model/vos/role.vo';
import sequelize from '../../src/infrastructure/config/postgresql';
import { OffensiveWordType, OffensiveWord } from '../../src/domain/model/entities/offensive-word.entity';
import { LevelVO } from '../../src/domain/model/vos/level.vo';
import { WordVO } from '../../src/domain/model/vos/word.vo';

describe('Offensive word', () => {

    const server: request.SuperTest<request.Test> = request(app);
    let adminToken = '';
    let repoOffensiveWord: OffensiveWordRepository;

    beforeAll(async () => {
        await connectToDB();
        await sequelize.authenticate();

        repoOffensiveWord = Container.get('OffensiveWordRepository');

        adminToken = await getAdminToken();
    });

    afterEach(async () => {
        const repo: OffensiveWordRepository = Container.get('OffensiveWordRepository');
        await repo.deleteAll();
    });

    describe('create', () => {
        it('should create', async () => {

            const newOffensiveWord = {
                word: 'Supertest',
                level: 3
            };
            const response = await server.post('/api/offensive-word').type('application/json')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(newOffensiveWord).expect(201);
            const { id } = response.body as OffensiveWordResponse;

            const offensiveWord = await repoOffensiveWord.getByWord(WordVO.create(newOffensiveWord.word));
            expect(offensiveWord?.id.value).toEqual(id);
            expect(offensiveWord?.level.value).toBe(newOffensiveWord.level);
            expect(offensiveWord?.word.value).toEqual(newOffensiveWord.word);
        });

        it('should not create because error, word not empty', async () => {

            await server.post('/api/offensive-word').type('application/json')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({level: 3}).expect(400);
        });
    });
    

    it('should update', async () => {

        const id = IdVO.create();

        const newOffensiveWord: OffensiveWordType = {
            id,
            word: WordVO.create('Supertest'),
            level: LevelVO.create(3)
        };
        repoOffensiveWord.save(new OffensiveWord(newOffensiveWord));

        const newWord = 'Update supertest';
        const newLevel = 4;
        await server.put(`/api/offensive-word/${id.value}`).type('application/json')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({word: newWord, level: newLevel}).expect(200);

        const updateOffensiveWord = await repoOffensiveWord.getById(id);

        expect(updateOffensiveWord?.word.value).toEqual(newWord);
        expect(updateOffensiveWord?.level.value).toEqual(newLevel);

    });

    it('should delete', async () => {

        const id = IdVO.create();

        const newOffensiveWord: OffensiveWordType = {
            id,
            word: WordVO.create('Supertest'),
            level: LevelVO.create(3)
        };
        repoOffensiveWord.save(new OffensiveWord(newOffensiveWord));

        await server.delete(`/api/offensive-word/${id.value}`).type('application/json')
            .set('Authorization', `Bearer ${adminToken}`).expect(200);

        const deleteOffensiveWord = await repoOffensiveWord.getById(id);
        expect(deleteOffensiveWord).toBe(null);

    });

    it('should get all', async() => {
        await server.post('/api/offensive-word').type('application/json')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({word: 'Caca', level: 3}).expect(201);

        await server.post('/api/offensive-word').type('application/json')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({word: 'Culo', level: 1}).expect(201);

        await server.post('/api/offensive-word').type('application/json')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({word: 'Pedo', level: 5}).expect(201);

        const response = await server.get('/api/offensive-word').type('application/json')
            .set('Authorization', `Bearer ${adminToken}`).expect(200);

        const words = response.body;
        expect(words.length).toBe(3);
        expect(words[0].word).toEqual('Caca');
    });
    
    afterAll(async () => {
        disconnectDB();
        const repoUser: UserRepository = Container.get('UserRepository');
        await repoUser.deleteAll();
        await sequelize.close();
    });

});