import app from './app';
import { connectToDB } from './infrastructure/config/mongo';
import { populateDatabases } from './infrastructure/config/populate';
import './infrastructure/config/postgresql';

connectToDB();

populateDatabases();

app.listen(3000, () => {
    console.log('Server started');
});
