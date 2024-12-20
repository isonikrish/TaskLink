import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const MainContext = createContext();

const BASE_URL = import.meta.env.VITE_API_URL;

export const MainContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isUserThere, setIsUserThere] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [allTasks, setAllTasks] = useState([]);

    // Helper function to create full API URL
    const createApiUrl = (endpoint) => `${BASE_URL}${endpoint}`;

    async function handleSignup(data, setIsLoading) {
        try {
            setIsLoading(true);
            const res = await axios.post(createApiUrl('/auth/signup'), data, {
                withCredentials: true,
            });
            if (res.status === 201) {
                toast.success('Signup successful');
                setIsUserThere(true);
            }
        } catch (error) {
            toast.error(error.response.data.msg);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleLogin(data, setIsLoading) {
        try {
            setIsLoading(true);
            const res = await axios.post(createApiUrl('/auth/login'), data, {
                withCredentials: true,
            });
            if (res.status === 201) {
                toast.success('Login successful');
                setIsUserThere(true);
            }
        } catch (error) {
            toast.error(error.response.data.msg);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleLogout() {
        try {
            const res = await axios.post(createApiUrl('/auth/logout'), {}, {
                withCredentials: true,
            });
            if (res.status === 201) {
                toast.success('Logout successful');
                setIsUserThere(false);
            }
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }

    async function fetchMe() {
        try {
            const res = await axios.get(createApiUrl('/auth/me'), {
                withCredentials: true,
            });
            if (res.status === 200) {
                setUser(res.data);
                setIsUserThere(true);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchMe();
    }, []);

    // Fetch tasks only if the user is logged in
    useEffect(() => {
        if (isUserThere) {
            fetchTasks();
            fetchCompletedTasks();
            fetchAllTasks();
        }
    }, [isUserThere]);

    async function fetchTasks() {
        try {
            const res = await axios.get(createApiUrl('/tasks/getTasks'), {
                withCredentials: true,
            });
            if (res.status === 200) {
                setTasks(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchCompletedTasks() {
        try {
            const res = await axios.get(createApiUrl('/tasks/getCompletedTasks'), {
                withCredentials: true,
            });
            if (res.status === 200) {
                setCompletedTasks(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchAllTasks() {
        try {
            const res = await axios.get(createApiUrl('/tasks/getAllTasks'), {
                withCredentials: true,
            });
            if (res.status === 200) {
                setAllTasks(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function handleAddTask(data, setIsLoading) {
        try {
            setIsLoading(true);
            const res = await axios.post(createApiUrl('/tasks/task'), data, {
                withCredentials: true,
            });
            if (res.status === 201) {
                toast.success('Task Created');
                fetchTasks();
                fetchAllTasks();
            }
        } catch (error) {
            toast.error('Error in creating task');
        } finally {
            setIsLoading(false);
        }
    }

    async function handleTaskStatus(id) {
        try {
            if (!id) {
                toast.error('Task ID is missing.');
                return;
            }

            const res = await axios.put(createApiUrl(`/tasks/changeTaskStatus/${id}`), {}, {
                withCredentials: true,
            });
            if (res.status === 200) {
                toast.success('Task status changed successfully!');
                fetchCompletedTasks();
                fetchTasks();
            }
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    }

    async function handleDeleteTask(id) {
        try {
            const res = await axios.delete(createApiUrl(`/tasks/delete/${id}`), {
                withCredentials: true,
            });
            if (res.status === 200) {
                toast.success('Task deleted successfully');
                fetchTasks();
                fetchCompletedTasks();
            }
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }

    return (
        <MainContext.Provider
            value={{
                handleSignup,
                handleLogin,
                handleLogout,
                fetchMe,
                user,
                isUserThere,
                handleAddTask,
                tasks,
                fetchTasks,
                handleTaskStatus,
                fetchCompletedTasks,
                completedTasks,
                handleDeleteTask,
                allTasks,
            }}
        >
            {children}
        </MainContext.Provider>
    );
};

export const useMainContext = () => {
    return useContext(MainContext);
};
