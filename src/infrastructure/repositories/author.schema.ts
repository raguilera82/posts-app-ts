import mongoose from 'mongoose';

const AuthorSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    }
});

const AuthorModel = mongoose.model('Authors', AuthorSchema);

export { AuthorModel };