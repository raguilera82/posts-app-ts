import mongoose from 'mongoose';

const connectToDB = async () => {

    const mongoOptions: mongoose.ConnectionOptions = {
        authSource: process.env.MONGO_AUTH_SOURCE ?? 'admin',
        auth: {
            user: process.env.MONGO_AUTH_USER ?? 'admin',
            password: process.env.MONGO_AUTH_PASS ?? 'admin',
        },
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    };

    const host = process.env.MONGO_HOST ?? 'localhost';
    const port = process.env.APP_MONGO_PORT ?? '27018';
    const dbName = process.env.MONGO_DB ?? 'blog';
    await mongoose.connect(`mongodb://${host}:${port}/${dbName}`, mongoOptions);

    const connection = mongoose.connection;

    connection.once('open', () => {
        console.log('MongoDb connected!');
    });

    connection.on('error', err => {
        console.log(err);
        process.exit(0);
    });
};

const disconnectDB = () => {
    mongoose.disconnect();
};

export { connectToDB, disconnectDB };