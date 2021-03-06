import 'reflect-metadata';

import { config } from 'dotenv';
config();

import { PostRepositoryMongo } from './infrastructure/repositories/post.repository.mongo';
import { AuthorRepositoryMongo } from './infrastructure/repositories/author.repository.mongo';
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
import { authorsRouter } from './infrastructure/routes/author.routes';
import { postsRouter } from './infrastructure/routes/posts.routes';
import {logger} from './infrastructure/config/logger';
import expressPinoLogger from 'express-pino-logger';
import cors from 'cors';

Container.set('OffensiveWordRepository', new OffensiveWordRepositoryMongo());
Container.set('AuthorRepository', new AuthorRepositoryMongo());
Container.set('UserRepository', new UserRepositoryPG());
Container.set('PostRepository', new PostRepositoryMongo());

console.log('App started');

const app = express();
app.use(cors());
app.use(json());
app.use(expressPinoLogger({logger: logger}));
app.use(offensiveWordRouter);
app.use(authRouter);
app.use(authorsRouter);
app.use(postsRouter);

app.use(passport.initialize());
passport.use(passportMiddleware);

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Blog API',
            version: '0.1.0',
            description: 'Blog API',
            license: {
                name: 'MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
            contact: {
                name: 'Blog',
                url: 'https://blog-api.com',
                email: 'info@blog-api.com',
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