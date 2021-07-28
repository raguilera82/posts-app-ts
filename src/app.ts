import 'reflect-metadata';

import express from 'express';
import { json } from 'body-parser';
import { offensiveWordRouter } from './infrastructure/routes/offensive-word.routes';
import Container from 'typedi';
import { OffensiveWordRepositoryMongo } from './infrastructure/repositories/offensive-word.repository.mongo';
import { UserRepositoryPG } from './infrastructure/repositories/user.repository.pg';
import { authRouter } from './infrastructure/routes/auth.routes';
import passport from 'passport';
import passportMiddleware from './infrastructure/middlewares/passport';
import swaggerUI from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

Container.set('OffensiveWordRepository', new OffensiveWordRepositoryMongo());
Container.set('UserRepository', new UserRepositoryPG());

console.log('App started');

const app = express();
app.use(json());
app.use(offensiveWordRouter);
app.use(authRouter);

app.use(passport.initialize());
passport.use(passportMiddleware);

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'LogRocket Express API with Swagger',
            version: '0.1.0',
            description:
        'This is a simple CRUD API application made with Express and documented with Swagger',
            license: {
                name: 'MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
            contact: {
                name: 'LogRocket',
                url: 'https://logrocket.com',
                email: 'info@email.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
            },
        ],
    },
    apis: ['./src/infrastructure/routes/*.ts'],
};
const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

export default app;