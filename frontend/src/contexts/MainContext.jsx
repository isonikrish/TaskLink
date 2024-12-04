import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
export const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isUserThere, setIsUserThere] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([])
    async function handleSignup(data, setIsLoading) {
        try {
            setIsLoading(true)
            const res = await axios.post('http://localhost:9294/api/auth/signup', data, {
                withCredentials: true
            });
            if (res.status === 201) {
                toast.success("Signout successfull")
                setIsUserThere(true)
            }
        } catch (error) {
            toast.error(error.response.data.msg)
        } finally {
            setIsLoading(false)
        }
    }
    async function handleLogin(data, setIsLoading) {
        try {
            setIsLoading(true)
            const res = await axios.post('http://localhost:9294/api/auth/login', data, {
                withCredentials: true
            });
            if (res.status === 201) {
                toast.success("Login successfull")
                setIsUserThere(true)
            }
        } catch (error) {
            toast.error(error.response.data.msg)
        } finally {
            setIsLoading(false)
        }
    }
    async function handleLogout() {
        try {
            const res = await axios.post('http://localhost:9294/api/auth/logout', {}, {
                withCredentials: true
            });
            if (res.status === 201) {
                toast.success("Logout successfull")
                setIsUserThere(false)
            }
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }
    async function fetchMe() {
        try {
            const res = await axios.get('http://localhost:9294/api/auth/me', {
                withCredentials: true
            });
            if (res.status === 200) {
                setUser(res.data)
                setIsUserThere(true)
            }
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchMe()
    }, [])
    async function fetchTasks() {
        try {
            const res = await axios.get("http://localhost:9294/api/tasks/getTasks", {
                withCredentials: "true",
            })
            if (res.status === 200) {
                setTasks(res.data);
            }
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        fetchTasks();
    }, [isUserThere])
    async function fetchCompletedTasks() {
        try {
            const res = await axios.get("http://localhost:9294/api/tasks/getCompletedTasks", {
                withCredentials: "true",
            })
            if (res.status === 200) {
                setCompletedTasks(res.data);
            }
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(()=>{
        fetchCompletedTasks()
    },[isUserThere])
    async function handleAddTask(data, setIsLoading) {
        try {
            setIsLoading(true)
            const res = await axios.post('http://localhost:9294/api/tasks/task', data, {
                withCredentials: true
            });
            if (res.status === 201) {
                toast.success("Task Created")
                fetchTasks()
            }

        } catch (error) {
            toast.error("Error in creating task")
        } finally {
            setIsLoading(false)
        }
    }
    async function handleTaskStatus(id) {
        try {
            if (!id) {
                toast.error("Task ID is missing.");
                return;
            }

            const res = await axios.put(`http://localhost:9294/api/tasks/changeTaskStatus/${id}`,
                {}, {
                withCredentials: true
            })
            if (res.status === 200) {
                toast.success("Task status changed successfully!")
                fetchCompletedTasks();
                fetchTasks();
            }
        }
        catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    }
    return (
        <MainContext.Provider value={{ handleSignup, handleLogin, handleLogout, fetchMe, user, isUserThere, handleAddTask, tasks, fetchTasks , handleTaskStatus, fetchCompletedTasks, completedTasks}}>
            {children}
        </MainContext.Provider>
    )
}

export const useMainContext = () => {
    return useContext(MainContext);
};