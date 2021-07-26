import request from 'supertest';
import app from './../../src/app';

describe('Offensive word', () => {

    let server: request.SuperTest<request.Test>;

    beforeAll(() => jest.setTimeout(20000));

    it('should create', async () => {

        server = request(app);
        const newOffensiveWord = {
            word: 'Supertest',
            level: 3
        };
        await server.post('/api/offensive-word').type('application/json').send(newOffensiveWord).expect(201);
    });

});