import mongoose from 'mongoose';

const connectToDB = async () => {
    try{
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect('mongodb://localhost:27018/blog', {
                authSource:'admin',
                auth: {
                    user: 'admin',
                    password: 'admin',
                },
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useFindAndModify: false
            });
        }
        
    }catch(err) {
        console.log(err);
    }
};

const disconnectDB = async () => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.disconnect();
    }
};

export { connectToDB, disconnectDB };