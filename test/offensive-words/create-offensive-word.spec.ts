import request from 'supertest';
import app from './../../src/app';
import { connectToDB, disconnectDB } from './../../src/infrastructure/config/mongo';

describe('Offensive word', () => {

    let server: request.SuperTest<request.Test>;

    beforeAll(() => {
        jest.setTimeout(20000);
        connectToDB();
    });

    it('should create', async () => {

        server = request(app);
        const newOffensiveWord = {
            word: 'Supertest',
            level: 3
        };
        await server.post('/api/offensive-word').type('application/json').send(newOffensiveWord).expect(201);
    });
    
    afterAll((done) => {
        disconnectDB(done);
    });

});