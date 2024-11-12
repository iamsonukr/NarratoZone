import mongoose from 'mongoose';

// Define the schema
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now, // Default to current date
        required: true,
    },
    image: {
        type: String,
        // default:`defaultBlog.jpg`,
        required: false, // Image is optional
    },
    author: {
        type: String,
        required: true, // Optionally, you could add an author field
    },
    tags: {
        type: [String], // Array of tags for categorizing the blog
        required: false,
    },
    likes:{
        type:Number,
        default:0
    }
});

// Create and export the model
const blogModel = mongoose.model('Blog', blogSchema);

export default blogModel;
