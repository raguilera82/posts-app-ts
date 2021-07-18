import { connectToDB } from './infrastructure/config/mongo';
import express from 'express';
import { json } from 'body-parser';
import { offensiveWordRouter } from './infrastructure/routes/offensive-word.routes';

connectToDB();

console.log('App started');

const app = express();
app.use(json());
app.use(offensiveWordRouter);

app.listen(3000, () => {
    console.log('Server started');
});
