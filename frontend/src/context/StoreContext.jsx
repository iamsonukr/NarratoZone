import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const StoreContext = createContext(null);

const StoreContextProvider = (prop) => {
    const [token, setToken] = useState('');
    const [name, setName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [blogs, setBlogs] = useState([]);
    const [blogLoading, setBlogLoading] = useState(false)

    const [blogTrigger,setBlogTrigger]=useState(1)

    // constants
    // const url=import.meta.env.VITE_API_URL
    const url=`https://resoultpartnersbackend.onrender.com`
    // const url = 'http://localhost:5000'

    const adminEmail='thesonukumar357@gmail.com'

    // 1> Fetch the blogs
    const fetchBlogs = async () => {
        try {
            setBlogLoading(true)
            const response = await axios.get(`${url}/api/blog/blogs`);
            setBlogs(response.data.data);
            // setFilteredBlogs(response.data.data);

            setBlogLoading(false)
        } catch (error) {
            toast.error("Error fetching blogs:", error);
            console.log(error)
            setBlogLoading(false)
        }finally{
            setBlogLoading(false)
        }
    };

    // functions to get the saved name email and token from the localstorage
    const loadToken = async () => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
        }
    };

    const loadName = async () => {
        if (localStorage.getItem("name")) {
            setName(localStorage.getItem("name"));
        }
    };

    const loadEmail = async () => {
        if (localStorage.getItem("userEmail")) {
            setUserEmail(localStorage.getItem("userEmail")); // Fixed here
        }
    };

    useEffect(() => {
        loadName();
        loadEmail();
        loadToken();
        fetchBlogs()
    }, []);

    useEffect(()=>{
        fetchBlogs()
    },[blogTrigger])

    const contextValue = {
        // functions
        setToken,
        setName,
        setUserEmail,
        fetchBlogs,
        setBlogTrigger,

        // variables
        url,
        token,
        name,
        userEmail,
        blogs,
        blogLoading,
        adminEmail,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {prop.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
