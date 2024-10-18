import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BlogList.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'

const BlogList = ({url}) => {
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 10;

    const [filters, setFilters] = useState({
        title: '',
        author: '',
        tags: ''
    });

    const navigate = useNavigate();

    const fetchBlogs = async () => {
        try {
            const response = await axios.get(`${url}/api/blog/blogs`);
            setBlogs(response.data.data);
            setFilteredBlogs(response.data.data); // Initialize filteredBlogs with all blogs
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    // Fetch blog data from the API
    useEffect(() => {
        fetchBlogs();
    }, []);

    // Handle filter changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
    };

    // Apply filters whenever filters state changes
    useEffect(() => {
        const filtered = blogs.filter(blog => {
            return (
                (filters.title === '' || blog.title.toLowerCase().includes(filters.title.toLowerCase())) &&
                (filters.author === '' || blog.author.toLowerCase().includes(filters.author.toLowerCase())) &&
                (filters.tags === '' || blog.tags.some(tag => tag.toLowerCase().includes(filters.tags.toLowerCase())))
            );
        });
        setFilteredBlogs(filtered);
        setCurrentPage(1); // Reset to the first page whenever filters are applied
    }, [filters, blogs]);

    // Pagination logic
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const deleteBlog = async (id) => {
        try {
            await axios.post(`${url}/api/blog/remove/${id}`);
            fetchBlogs(); // Refresh blog list after deletion
            toast.success("Blog Deleted Successfully")
        } catch (error) {
            toast.error("Blog Deletion Failed")
        }
    };

    return (
        <div>

           
        <div className="blog-list-container">
            <h1 className="blog-list-title"></h1>

            <div className="filters-container">
                <label className="filter-label">
                    Title:
                    <input
                        className='filter-select'
                        type="text"
                        name="title"
                        value={filters.title}
                        onChange={handleFilterChange}
                        placeholder="Filter by title"
                        />
                </label>

                <label className="filter-label">
                    Author:
                    <input
                        className='filter-select'
                        type="text"
                        name="author"
                        value={filters.author}
                        onChange={handleFilterChange}
                        placeholder="Filter by author"
                        />
                </label>

                <label className="filter-label">
                    Tags:
                    <input
                        className='filter-select'
                        type="text"
                        name="tags"
                        value={filters.tags}
                        onChange={handleFilterChange}
                        placeholder="Filter by tags"
                        />
                </label>
            </div>

            {/* Display current page information */}
            <div className="pagination-info">
                <p>Showing {indexOfFirstBlog + 1}-{Math.min(indexOfLastBlog, filteredBlogs.length)} of {filteredBlogs.length} results</p>
            </div>

            <ul className="blog-list">
                {currentBlogs.map(blog => (
                    <li key={blog._id} className="blog-card">
                        <img src={`${url}/images/`+blog.image} alt={blog.title} className="blog-image" />
                        <div className="blog-details">
                            <h2 className="blog-title">{blog.title}</h2>
                            <p className="blog-author"><strong>Author:</strong> {blog.author}</p>
                            <p className="blog-author"><strong>Description:</strong> {blog.description}</p>
                            <p className="blog-tags"><strong>Tags:</strong> {blog.tags.join(', ')}</p>
                            <p className="blog-date"><strong>Date:</strong> {new Date(blog.date).toLocaleDateString()}</p>
                        </div>
                        <div className="blog-actions">
                            <button className='blog-delete' onClick={() => deleteBlog(blog._id)}>Delete</button>
                            <button className='blog-update' onClick={() => navigate(`/create/${blog._id}`)}>Update</button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Pagination */}
            <div className="pagination">
                {Array.from({ length: Math.ceil(filteredBlogs.length / blogsPerPage) }, (_, index) => (
                    <button
                    key={index + 1}
                    onClick={() => paginate(index + 1)}
                    className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
                </div>
    );
};

export default BlogList;
