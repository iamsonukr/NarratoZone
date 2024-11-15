import React, { useEffect, useState } from 'react';
import './CreateBlog.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const CreateBlog = ({ url }) => {
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate()

    const [data, setData] = useState({
        title: "",
        description: "",
        author: "",
        tags: "",
        date: new Date().toISOString().split('T')[0],

    });

    const { id } = useParams();

    const fetchBlogData = async () => {
        try {
            const response = await axios.post(`${url}/api/blog/getsingle/${id}`);
            console.log(response)
            if (response.data.success) {
                const blog = response.data.data;
                setData({
                    title: blog.title,
                    description: blog.description,
                    author: blog.author,
                    tags: blog.tags.join(', '),
                    date: new Date(blog.date).toISOString().split('T')[0],
                });
                // Handle existing image
                if (blog.image) {
                    setImagePreview(`${url}/images/${blog.image}`); // Set the image preview URL
                    console.log("Image preview is " + imagePreview)
                }
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error fetching blog data:", error);
            toast.error("An error occurred while fetching the blog data.");
        }
    };

    useEffect(() => {
        if (id) {
            fetchBlogData();
        }
    }, [id]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('author', data.author);
        formData.append('tags', data.tags.split(',').map(tag => tag.trim())); // Trim whitespace from tags
        formData.append('date', data.date);
        formData.append('id', id);

        // Only append image if a new one is selected or we're creating a new blog
        if (image) {
            formData.append('image', image);
        }

        try {
            let response;
            if (id) {
                response = await axios.post(`${url}/api/blog/update/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                navigate('/')
                toast.success("Blog Updated Successfully");

            } else {
                response = await axios.post(`${url}/api/blog/create`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                navigate('/')
                toast.success("Blog Created Successfully");
            }

           
        } catch (error) {
            toast.error("An error occurred while processing your request.");
        }
    };

    return (
        <div className="add">
            <form className="flex-col" onSubmit={handleSubmit}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image" className="image-upload-label">
                        <img
                            src={imagePreview || assets.upload_area}
                            alt="Upload preview"
                            className="upload-preview"
                        />
                    </label>
                    <input
                        onChange={handleImageChange}
                        type="file"
                        id="image"
                        accept="image/*"
                        hidden
                        required={!id && !image}
                    />
                </div>

                <div className="add-blog-title flex-col">
                    <p>Blog Title</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.title}
                        type="text"
                        name="title"
                        placeholder="Enter blog title"
                        required
                    />
                </div>

                <div className="add-blog-description flex-col">
                    <p>Blog Content</p>
                    <textarea
                        onChange={onChangeHandler}
                        value={data.description}
                        name="description"
                        rows={6}
                        placeholder="Write your description here"
                        required
                    ></textarea>
                </div>

                <div className="add-author-date">
                    <div className="add-author flex-col">
                        <p>Author</p>
                        <input
                            onChange={onChangeHandler}
                            value={data.author}
                            type="text"
                            name="author"
                            placeholder="Author name"
                            required
                        />
                    </div>

                    <div className="add-date flex-col">
                        <p>Date</p>
                        <input
                            onChange={onChangeHandler}
                            value={data.date}
                            type="date"
                            name="date"
                            required
                        />
                    </div>
                </div>

                <div className="add-tags flex-col">
                    <p>Tags (comma-separated)</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.tags}
                        type="text"
                        name="tags"
                        placeholder="tag1, tag2, tag3"
                    />
                </div>

                <button type="submit" className="add-btn">
                    {id ? 'UPDATE' : 'ADD'}
                </button>
            </form>
        </div>
    );
};

export default CreateBlog;