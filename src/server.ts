import app from './app';
import { connectToDB } from './infrastructure/config/mongo';
import { populateOffensiveWords } from './infrastructure/config/populate';
import './infrastructure/config/postgresql';

connectToDB();

populateOffensiveWords();

app.listen(3000, () => {
    console.log('Server started');
});
