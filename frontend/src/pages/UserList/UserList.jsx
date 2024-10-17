import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserList.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 50;

    const [filters, setFilters] = useState({
        domain: '',
        gender: '',
        available: '',
        first_name: ''
    });

    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://usermanagement-prq5.onrender.com/api/user/list');
            setUsers(response.data.data);
            setFilteredUsers(response.data.data); // Initialize filteredUsers with all users
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // Fetch user data from the API
    useEffect(() => {
        fetchUsers();
        console.log(users)
    }, []);

    // Handle filter changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
    };

    // Apply filters whenever filters state changes
    useEffect(() => {
        const filtered = users.filter(user => {
            return (
                (filters.domain === '' || user.domain === filters.domain) &&
                (filters.gender === '' || user.gender === filters.gender) &&
                (filters.first_name === '' || user.first_name.toLowerCase().includes(filters.first_name.toLowerCase())) &&
                (filters.available === '' || String(user.available) === filters.available)
            );
        });
        setFilteredUsers(filtered);
        setCurrentPage(1); // Reset to the first page whenever filters are applied
    }, [filters, users]);

    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const deleteUser = async (id) => {
        try {
            let deluser = await axios.post('https://usermanagement-prq5.onrender.com/api/user/remove', { "id": id });
            window.alert("User Deleted Successfully");
            navigate('/list');
        } catch (error) {
            window.alert("User Deletion Failed");
        }
    };

    const addTeam=()=>{

    }

    return (
        <div className="user-list-container">
            <h1 className="user-list-title">User List</h1>

           
            
            <div className="filters-container">
                <label className="filter-label">
                    Domain:
                    <select name="domain" value={filters.domain} onChange={handleFilterChange} className="filter-select">
                        <option value="">All</option>
                        <option value="Business Development">Business Development</option>
                        <option value="Finance">Finance</option>
                        <option value="IT">IT</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Management">Management</option>
                        <option value="Sales">Sales</option>
                        <option value="Software Development">Software Development</option>
                        <option value="UI Designing">UI Designing</option>
                    </select>
                </label>

                <label className="filter-label">
                    Gender:
                    <select name="gender" value={filters.gender} onChange={handleFilterChange} className="filter-select">
                        <option value="">All</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="non-binary">Non-binary</option>
                    </select>
                </label>

                <label className="filter-label">
                    Availability:
                    <select name="available" value={filters.available} onChange={handleFilterChange} className="filter-select">
                        <option value="">All</option>
                        <option value="true">Available</option>
                        <option value="false">Not Available</option>
                    </select>
                </label>

                <label className="filter-label">
                    Name:
                    <input className='filter-select' type="text" name="first_name" value={filters.first_name} onChange={handleFilterChange} />
                </label>
            </div>

             {/* Display current page information */}
             <div className="pagination-info">
                <p>Showing {indexOfFirstUser + 1}-{Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} results</p>
            </div>

            <ul className="user-list">
                {currentUsers.map(user => (
                    <li key={user.id} className="user-card">
                        <img src={user.avatar} alt="" />
                        <p className="user-info"><strong>Name:</strong> {user.first_name} {user.last_name}</p>
                        <p className="user-info"><strong>Email:</strong> {user.email}</p>
                        <p className="user-info"><strong>Domain:</strong> {user.domain}</p>
                        <p className="user-info"><strong>Gender:</strong> {user.gender}</p>
                        <p className="user-info"><strong>Availability:</strong> {user.available ? 'Available' : 'Not Available'}</p>
                        <button className='user-delete' onClick={() => deleteUser(user._id)}>Delete</button>
                        <button className='user-update' onClick={() => navigate(`/create/${user._id}`)}>Update</button>
                        <button className='user-team' onClick={addTeam}>Add Team</button>
                    </li>
                ))}
            </ul>

            {/* Pagination */}
            <div className="pagination">
                {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, index) => (
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
    );
};

export default UserList;
