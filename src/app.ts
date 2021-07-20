import 'reflect-metadata';

import { connectToDB } from './infrastructure/config/mongo';
import express from 'express';
import { json } from 'body-parser';
import { offensiveWordRouter } from './infrastructure/routes/offensive-word.routes';
import Container from 'typedi';
import { OffensiveWordRepositoryMongo } from './infrastructure/repositories/offensive-word.repository.mongo';
import { populateOffensiveWords } from './infrastructure/config/populate';

Container.set('OffensiveWordRepository', new OffensiveWordRepositoryMongo());

connectToDB();

populateOffensiveWords();

console.log('App started');

const app = express();
app.use(json());
app.use(offensiveWordRouter);

app.listen(3000, () => {
    console.log('Server started');
});
