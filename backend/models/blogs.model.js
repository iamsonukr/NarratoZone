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
    authorEmail:{
        type: String,
        required: true,
    },
    tags: {
        type: [String], // Array of tags for categorizing the blog
        required: false,
    },
    likes: {
        type: [String], // Array of user IDs who liked the blog
        default: []
    }
});

// Create and export the model
const blogModel = mongoose.model('Blog', blogSchema);

export default blogModel;
