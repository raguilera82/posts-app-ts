import mongoose from 'mongoose';

const connectToDB = async () => {

    const mongoOptions: mongoose.ConnectionOptions = {
        authSource:'admin',
        auth: {
            user: 'admin',
            password: 'admin',
        },
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    };

    await mongoose.connect('mongodb://localhost:27018/blog', mongoOptions);

    const connection = mongoose.connection;

    connection.once('open', () => {
        console.log('MongoDb connected!');
    });

    connection.on('error', err => {
        console.log(err);
        process.exit(0);
    });
};

const disconnectDB = (callback: any) => {
    mongoose.disconnect(callback);
};

export { connectToDB, disconnectDB };