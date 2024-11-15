import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './BlogList.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { StoreContext } from '../../context/StoreContext';
import Header from '../../components/Header/Header';

const BlogList = ({ url, setShowLogin }) => {
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading,setLoading]=useState(false)
    const { token } = useContext(StoreContext)
    const blogsPerPage = 10;

    const [filters, setFilters] = useState({ title: '', author: '', tags: '' });
    const navigate = useNavigate();

    const fetchBlogs = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${url}/api/blog/blogs`);
            setBlogs(response.data.data);
            setFilteredBlogs(response.data.data);
            setLoading(false)
        } catch (error) {
            toast.error("Error fetching blogs:", error);
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
    };

    useEffect(() => {
        const filtered = blogs.filter(blog => (
            (filters.title === '' || blog.title.toLowerCase().includes(filters.title.toLowerCase())) &&
            (filters.author === '' || blog.author.toLowerCase().includes(filters.author.toLowerCase())) &&
            (filters.tags === '' || blog.tags.some(tag => tag.toLowerCase().includes(filters.tags.toLowerCase())))
        ));
        setFilteredBlogs(filtered);
        setCurrentPage(1);
    }, [filters, blogs]);

    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const deleteBlog = async (id) => {
        if (!token) {
            setShowLogin(true)
        } else {
            let confirmDel = confirm("Are you sure? It is irreverseble.")
            if (confirmDel) {
                try {
                    await axios.post(`${url}/api/blog/remove/${id}`);
                    fetchBlogs();
                    toast.success("Blog Deleted Successfully");

                } catch (error) {
                    toast.error("Blog Deletion Failed");
                }
            } else {

                toast.success("Deletion Canceled 😀")

            }

        }

    };

    const increaseBlogLike = async (id) => {
        if (!token) {
            setShowLogin(true)
        } else {
            try {
                await axios.post(`${url}/api/blog/like/${id}`);
                fetchBlogs();
            } catch (error) {
                console.log(error);
            }

        }
    };

    const gotoUpdate = (id) => {
        if (!token) {
            setShowLogin(true)
        } else {
            navigate(`/create/${id}`)
        }
    }

    return (
        <>
        <Header/>
            {loading?<h1 className='loadingText' >Please wait Blogs are loading</h1>:""}
            <div className="blog-list-container">
                {/* <h1>Blog List</h1> */}

                <div className="filters-container">
                    <input
                        type="text"
                        name="title"
                        value={filters.title}
                        onChange={handleFilterChange}
                        placeholder="Filter by title"
                        className="filter-input"
                    />
                    <input
                        type="text"
                        name="author"
                        value={filters.author}
                        onChange={handleFilterChange}
                        placeholder="Filter by author"
                        className="filter-input"
                    />
                    <input
                        type="text"
                        name="tags"
                        value={filters.tags}
                        onChange={handleFilterChange}
                        placeholder="Filter by tags"
                        className="filter-input"
                    />
                </div>
                

                <ul className="blog-list">
                    {currentBlogs.map(blog => (
                        <li key={blog._id} className="blog-card">
                            <img src={`${url}/images/${blog.image}`} alt={blog.title} className="blog-image" />
                            <div className="blog-content">
                                <h2>{blog.title}</h2>
                                <p><strong>Author:</strong><span className='blogText'>{blog.author}</span> </p>
                                <p><strong>Description:</strong><span className='blogText'> {blog.description} </span></p>
                                <p><strong>Tags:</strong> <span className='blogText'> {blog.tags.join(', ')} </span> </p>
                                <p><strong>Date:</strong> <span className='blogText'> {new Date(blog.date).toLocaleDateString()}</span></p>
                                <div className="blog-actions">
                                    <button onClick={() => increaseBlogLike(blog._id)} className='like-btn'><span className='heart'>♥️</span> {blog.likes}</button>
                                    <button onClick={() => deleteBlog(blog._id)} className='delete-btn'>Delete</button>
                                    <button onClick={() => gotoUpdate(blog._id)} className='update-btn'>Update</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="pagination">
                    {Array.from({ length: Math.ceil(filteredBlogs.length / blogsPerPage) }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => paginate(index + 1)}
                            className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};

export default BlogList;
