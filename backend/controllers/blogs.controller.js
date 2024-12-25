import blogModel from "../models/blogs.model.js";

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
    let image_filename= `${req.file.path}`
    console.log(image_filename)
    console.log(req.body)


    const newBlog = new blogModel({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date || Date.now(), // Use request date or default to now
        image: image_filename,
        author: req.body.author,
        tags: req.body.tags,
        authorEmail:req.body.userEmail
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
    const blogID = req.params.id;
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
// const updateBlog = async (req, res) => {
//     const blogID = req.params.id;
//     try {
//         const updatedBlog = await blogModel.findByIdAndUpdate(
//             blogID,
//             {
//                 title: req.body.title,
//                 description: req.body.description,
//                 date: req.body.date,
//                 image: req.body.image,
//                 author: req.body.author,
//                 tags: req.body.tags,
//             },
//             { new: true } // Return the updated document
//         );
//         if (!updatedBlog) {
//             res.json({ success: false, message: "Blog not found" });
//         } else {
//             res.json({ success: true, data: updatedBlog });
//         }
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Blog updating failed", error: error });
//     }
// };

// increasing the like of blog

// const increaseLike=async(req,res)=>{
//     const blogId=req.params.id
//     const userEmail=req.body.userEmail

//     try {
//         const theBlog=await blogModel.findById(blogId)
//         if(theBlog.includes(userEmail)){
//             res.json({message:"Your already Liked this blog"})
//         }else{
//             theBlog.likes.push(userEmail)
//             await theBlog.save()
//             res.json({message:"Blog liked successfully",likes:theBlog.likes.length})
//         }
        // const incLike=await blogModel.findByIdAndUpdate(blogId,{$inc:{likes:1}},{new:true});
        // if(incLike){
        //     res.send({message:"You liked this post"})
        // }else{
        //     res.send({message:"Error liking this post"})
        // }
        
//     } catch (error) {
//         res.send({message:"Error liking this post Check the eligibility"})
//         console.log(error)
//     }
// }


const increaseLike = async (req, res) => {
    const { id } = req.params;
    const userId = req.body.userEmail; // Extract user ID from the authenticated token
    console.log("the usermaulis ",userId)
    try {
        const blog = await blogModel.findById(id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found.' });
        }

        // Check if the user has already liked the blog
        if (blog.likes.includes(userId)) {
            return res.status(200).json({ message: 'Already liked.', alreadyLiked: true });
        }

        // Add the user ID to the likes array and save
        blog.likes.push(userId);
        await blog.save();

        res.status(200).json({ message: 'Liked successfully.', alreadyLiked: false });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred.', error });
    }
};


const       updateBlog = async (req, res) => {
    const blogId = req.params.id; // Assuming the blog ID is passed in the URL params
    try {
        // Find the blog by its ID
        let blog = await blogModel.findById(blogId);
        if (!blog) {
            return res.json({ success: false, message: "Blog not found" });
        }

        // Update the blog fields
        blog.title = req.body.title || blog.title;
        blog.description = req.body.description || blog.description;
        blog.date = req.body.date || blog.date; // Update date if provided
        if (req.file) { // If a new image is provided
            blog.image = req.file.path;
        }
        blog.author = req.body.author || blog.author;
        blog.tags = req.body.tags || blog.tags;

        // Save the updated blog
        await blog.save();
        console.log(blog);
        res.json({ success: true, message: "Blog Updated", data: blog });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Blog updating failed", error: error });
    }
};


// Get a single blog by ID
const getSingleBlog = async (req, res) => {
    console.log("MEssage enttere in the fuct")
    const blogID = req.params.id;
    try {
        const blog = await blogModel.findById(blogID);
        if (!blog) {
            res.json({ success: false, message: "Blog not found" });
        } else {
            console.log(blog)
            res.json({ success: true, data: blog });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching blog", error: error });
    }
};

export { listBlog, createBlog, removeBlog, updateBlog, getSingleBlog ,increaseLike};
