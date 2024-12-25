import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './BlogList.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';


import { StoreContext } from '../../context/StoreContext';
import Header from '../../components/Header/Header';

const BlogList = ({ setShowLogin }) => {

    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const { token, userEmail,blogs,blogLoading,url,fetchBlogs,adminEmail } = useContext(StoreContext)

    const blogsPerPage = 10;

    const [filters, setFilters] = useState({ search: "" });
    const navigate = useNavigate();



    const handleFilterChange = (e) => {
        setFilters({ search: e.target.value });
    };

    useEffect(() => {
        const filtered = blogs.filter(blog => {
            const searchValue = filters.search.toLowerCase();
            return (
                filters.search === '' ||
                blog.title.toLowerCase().includes(searchValue) ||
                blog.author.toLowerCase().includes(searchValue) ||
                blog.tags.some(tag => tag.toLowerCase().includes(searchValue))
            );
        });
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
            }

        }

    };

    const increaseBlogLike = async (id) => {
        if (!token) {
            setShowLogin(true);
            return;
        }
        try {
            const response = await axios.post(`${url}/api/blog/like/${id}`, { userEmail });
            if (response.data.alreadyLiked) {
                toast.error('You have already liked this blog.');
            } else {
                fetchBlogs(); 
            }

        } catch (error) {
            console.log(error);
        }finally{
            fetchBlogs()
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
            <Header />
            {blogLoading ? <h1 className='loadingText' >Please wait Blogs are loading</h1> : ""}
            <div className="blog-list-container">
                {/* <h1>Blog List</h1> */}

                <div className="filters-wrapper">
                    <div className="search-container">
                        <div className="search-icon">
                            {/* <Search size={20} /> */}

                        </div>
                        <input
                            type="text"
                            name="search"
                            value={filters.search || ''}
                            onChange={handleFilterChange}
                            placeholder={` Search by title, author, or tags`}
                            className="search-input"
                        />
                    </div>
                </div>


                <ul className="blog-list">
                    {currentBlogs.map(blog => (
                        <li key={blog._id} className="blog-card">
                            <img src={blog.image} alt={blog.title} className="blog-image" />
                            <div className="blog-content">
                                <h2>{blog.title}</h2>
                                <p><strong>Author : </strong><span className='blogText'>{blog.author}</span> </p>
                                <p><strong>Description : </strong><span className='blogText'> {blog.description} </span></p>
                                {/* <p><strong>Tags : </strong> <span className='blogText'> {blog.tags.join(', ')} </span> </p> */}
                                <p><strong>Tags : </strong> <span className='blogText'> {blog.tags.join(', ')} </span> </p>
                                <p><strong>Date : </strong> <span className='blogText'> {new Date(blog.date).toLocaleDateString()}</span></p>
                                <div className="blog-actions">
                                    <button onClick={() => increaseBlogLike(blog._id)} className='like-btn'>
                                        {/* <span className='heart'>&#9829;</span>  */}
                                        {
                                            blog.likes.includes(userEmail) ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    width="30"
                                                    height="30"
                                                    fill="red"
                                                >
                                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                                </svg>
                                            ) : (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    width="30"
                                                    height="30"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                >
                                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                                </svg>
                                            )
                                        }





                                        <span className='heart-number' >{blog.likes.length}</span>
                                    </button>

                                    {((blog.authorEmail && blog.authorEmail === userEmail) || (userEmail== adminEmail))
                                        ? (
                                            <>
                                                <button onClick={() => deleteBlog(blog._id)} className='delete-btn'>Delete</button>
                                                <button onClick={() => gotoUpdate(blog._id)} className='update-btn'>Update</button>
                                            </>
                                        )
                                        : <></>
                                    }

                                    {/* <button onClick={() => deleteBlog(blog._id)} className='delete-btn'>Delete</button>
                                    <button onClick={() => gotoUpdate(blog._id)} className='update-btn'>Update</button> */}

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
