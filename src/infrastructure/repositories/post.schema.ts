import mongoose, { Schema } from 'mongoose';

const PostSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        id: String,
        name: String,
        nickname: String
    },
    comments: [{
        id: String,
        nickname: String,
        content: String,
        timestamp: String
    }]
});

const PostModel = mongoose.model('Posts', PostSchema);

export { PostModel };