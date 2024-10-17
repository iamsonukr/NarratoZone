import blogModel from "../models/model.blogs.js";

// List all blogs
const listBlog = async (req, res) => {
    try {
        const data = await blogModel.find({});
        res.json({ success: true, data: data });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching blogs", error: error });
    }
};

// Create a new blog
const createBlog = async (req, res) => {
    const newBlog = new blogModel({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date || Date.now(), // Use request date or default to now
        image: req.body.image,
        author: req.body.author,
        tags: req.body.tags,
    });
    try {
        await newBlog.save();
        console.log(newBlog);
        res.json({ success: true, message: "Blog Added", data: newBlog });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Blog adding failed", error: error });
    }
};

// Remove a blog by ID
const removeBlog = async (req, res) => {
    const blogID = req.body.id;
    try {
        const deletedBlog = await blogModel.findByIdAndDelete(blogID);
        if (deletedBlog) {
            res.json({ success: true, message: "Blog Deleted Successfully" });
        } else {
            res.json({ success: false, message: "Blog not found" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Blog Deletion Failed", error: error });
    }
};

// Update a blog by ID
const updateBlog = async (req, res) => {
    const blogID = req.body.id;
    try {
        const updatedBlog = await blogModel.findByIdAndUpdate(
            blogID,
            {
                title: req.body.title,
                description: req.body.description,
                date: req.body.date,
                image: req.body.image,
                author: req.body.author,
                tags: req.body.tags,
            },
            { new: true } // Return the updated document
        );
        if (!updatedBlog) {
            res.json({ success: false, message: "Blog not found" });
        } else {
            res.json({ success: true, data: updatedBlog });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Blog updating failed", error: error });
    }
};

// Get a single blog by ID
const getSingleBlog = async (req, res) => {
    const blogID = req.params.id;
    try {
        const blog = await blogModel.findById(blogID);
        if (!blog) {
            res.json({ success: false, message: "Blog not found" });
        } else {
            res.json({ success: true, data: blog });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching blog", error: error });
    }
};

export { listBlog, createBlog, removeBlog, updateBlog, getSingleBlog };
