import mongoose from 'mongoose';

const OffensiveWordSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    word: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    }
});

const OffensiveWordModel = mongoose.model('OffensiveWords', OffensiveWordSchema);

export { OffensiveWordModel };