import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CreateBlog.css';
import axios from 'axios';

const CreateBlog = () => {
    const { id } = useParams();  // Blog ID for editing

    // Manage the states of input fields
    const [data, setData] = useState({
        title: "",
        description: "",
        date: "",
        image: "",
        author: "",
        tags: []
    });

    // Fetch blog data if ID exists (for editing a blog)
    const getBlogData = async () => {
        try {
            const response = await axios.get(`http://localhost:5001/api/blog/getsingle/${id}`);
            console.log(response.data.data);
            setData(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (id) {
            getBlogData();
        } else {
            // Clear the form when not editing
            setData({
                title: "",
                description: "",
                date: "",
                image: "",
                author: "",
                tags: []
            });
        }
    }, [id]);

    // Handle input field changes
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(data => ({
            ...data,
            [name]: value
        }));
    };

    // Handle tag input (comma-separated string -> array)
    const handleTagsChange = (event) => {
        setData({
            ...data,
            tags: event.target.value.split(',').map(tag => tag.trim())
        });
    };

    // Submit the blog data
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            let response;
            if (id) {
                // Update existing blog
                response = await axios.put(`http://localhost:5001/api/blog/update/${id}`, data);
            } else {
                // Create a new blog
                response = await axios.post("http://localhost:5001/api/blog/create", data);
            }

            if (response.data.success) {
                console.log("Blog added/updated successfully!");
                // Reset form after successful submission
                setData({
                    title: "",
                    description: "",
                    date: "",
                    image: "",
                    author: "",
                    tags: []
                });
            } else {
                console.log("Operation failed");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className='create-blog'>
            {id ? <h1>Update Blog</h1> : <h1>Create New Blog</h1>}
            <form className='flex-col' onSubmit={handleSubmit}>
                
                <div className="flex-col">
                    <p>Title</p>
                    <input type="text" name="title" value={data.title} onChange={onChangeHandler} required />
                </div>

                <div className="flex-col">
                    <p>Description</p>
                    <textarea name="description" value={data.description} onChange={onChangeHandler} required />
                </div>

                <div className="flex-col">
                    <p>Date</p>
                    <input type="date" name="date" value={data.date} onChange={onChangeHandler} required />
                </div>

                <div className="flex-col">
                    <p>Image URL</p>
                    <input type="text" name="image" value={data.image} onChange={onChangeHandler} />
                </div>

                <div className="flex-col">
                    <p>Author</p>
                    <input type="text" name="author" value={data.author} onChange={onChangeHandler} required />
                </div>

                <div className="flex-col">
                    <p>Tags (comma separated)</p>
                    <input type="text" name="tags" value={data.tags.join(', ')} onChange={handleTagsChange} />
                </div>

                <button type='submit' className='submit-btn'>
                    {id ? 'Update Blog' : 'Add Blog'}
                </button>
            </form>
        </div>
    );
};

export default CreateBlog;
