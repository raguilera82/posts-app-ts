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

Container.set('OffensiveWordRepository', new OffensiveWordRepositoryMongo());
Container.set('UserRepository', new UserRepositoryPG());

console.log('App started');

const app = express();
app.use(json());
app.use(offensiveWordRouter);
app.use(authRouter);

app.use(passport.initialize());
passport.use(passportMiddleware);

export default app;