// import React from 'react'

// const Filter = () => {
//     const [filteredBlogs, setFilteredBlogs] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
    

//     useEffect(() => {
//         const filtered = blogs.filter(blog => (
//             (filters.title === '' || blog.title.toLowerCase().includes(filters.title.toLowerCase())) &&
//             (filters.author === '' || blog.author.toLowerCase().includes(filters.author.toLowerCase())) &&
//             (filters.tags === '' || blog.tags.some(tag => tag.toLowerCase().includes(filters.tags.toLowerCase())))
//         ));
//         setFilteredBlogs(filtered);
//         setCurrentPage(1);
//     }, [filters, blogs]);
//     return (
//         <div className="filters-container">
//             <input
//                 type="text"
//                 name="title"
//                 value={filters.title}
//                 onChange={handleFilterChange}
//                 placeholder="Filter by title"
//                 className="filter-input"
//             />
//             <input
//                 type="text"
//                 name="author"
//                 value={filters.author}
//                 onChange={handleFilterChange}
//                 placeholder="Filter by author"
//                 className="filter-input"
//             />
//             <input
//                 type="text"
//                 name="tags"
//                 value={filters.tags}
//                 onChange={handleFilterChange}
//                 placeholder="Filter by tags"
//                 className="filter-input"
//             />
//         </div>
//     )
// }

// export default Filter