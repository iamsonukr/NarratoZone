import React, { useEffect, useState,useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './CreateBlog.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const   CreateBlog = ({setShowLogin }) => {

    // variables
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [submitting,setSubmitting]=useState(false)
    const navigate = useNavigate()
    const {userEmail ,name,setToken,url,fetchBlogs,setBlogTrigger} =useContext(StoreContext)

    const [data, setData] = useState({
        title: "",
        description: "",
        author: "",
        tags: "",
        date: new Date().toISOString().split('T')[0],

    });

    const { id } = useParams();


    // Fetching the blog data to edit
    const fetchBlogData = async () => {
        try {
            const response = await axios.post(`${url}/api/blog/getsingle/${id}`);
  
            if (response.data.success) {
                const blog = response.data.data;
                setData({
                    title: blog.title,
                    description: blog.description,
                    author: blog.author,
                    tags: blog.tags.join(', '),
                    date: new Date(blog.date).toISOString().split('T')[0]
                    
                });
                // Handle existing image
                if (blog.image) {
                    setImagePreview(blog.image); // Set the image preview URL
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

    // 
    useEffect(() => {
        if (id) {
            fetchBlogData();
        }
        if(!name){
            toast.error("Please login again !")
            setShowLogin(true)
            setToken("")
        }
    }, [id,name]);

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

    // SUbmitting the data
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
    
        if (submitting) {
            toast.error("Please wait, your data is being submitted.");
            return;
        }
    
        setSubmitting(true); // Set submitting state to true to prevent multiple submissions
    
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('author', name);
        // formData.append('tags', JSON.stringify(data.tags.split(',').map(tag => tag.trim()))); 
        data.tags.split(',').map(tag => formData.append('tags[]', tag.trim()));// Convert tags array to JSON string
        formData.append('date', data.date);
        formData.append('id', id);
        formData.append('userEmail', userEmail);
    
        // Append image only if one is selected
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
                toast.success("Blog updated successfully");
      
            } else {
                response = await axios.post(`${url}/api/blog/create`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                toast.success("Blog created successfully");
            }
            navigate('/'); // Redirect after successful operation
        } catch (error) {
            console.error(error); // Log the error for debugging
            toast.error("An error occurred while processing your request.");
        } finally {
            setSubmitting(false); // Reset submitting state
            setBlogTrigger(prev=>prev+1)
        }
    };
    

    return (
        <div className="add" >
            <form className="flex-col" onSubmit={handleSubmit}>
                <div className="add-img-upload flex-col" style={{marginTop:60}}>
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
                          
                            value={name}
                            type="text"
                            name="author"
                     
                            required
                            disabled
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