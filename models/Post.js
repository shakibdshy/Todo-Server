import mongoose from 'mongoose';
const { Schema } = mongoose;

const PostSchema = new Schema({
    name: String,
    complete: Boolean,
});

export default mongoose.model('Post', PostSchema);