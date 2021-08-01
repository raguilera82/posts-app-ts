import app from './app';
import { connectToDB } from './infrastructure/config/mongo';
import { populateDatabases } from './infrastructure/config/populate';
import './infrastructure/config/postgresql';

connectToDB();

populateDatabases();

const port = process.env.APP_PORT ?? 3000;

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});
