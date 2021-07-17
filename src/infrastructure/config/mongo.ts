import mongoose from 'mongoose';

const connectToDB = async () => {
    try{
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
    }catch(err) {
        console.log(err);
    }
};

export { connectToDB };