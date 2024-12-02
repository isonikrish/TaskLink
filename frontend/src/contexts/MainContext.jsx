import {createContext, useContext} from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
export const MainContext = createContext();

export const MainContextProvider = ({children}) =>{
    async function handleSignup(data)
    {
        try {
            const res = await axios.post('http://localhost:9294/api/auth/signup',data,{
                withCredentials: true
            });
            if(res.status === 201){
                toast.success("Signout successfull")   
            }
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }
    async function handleLogin(data)
    {
        try {
            const res = await axios.post('http://localhost:9294/api/auth/login',data,{
                withCredentials: true
            });
            if(res.status === 201){
                toast.success("Login successfull")   
            }
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }
    async function handleLogout()
    {
        try {
            const res = await axios.post('http://localhost:9294/api/auth/logout',{
                withCredentials: true
            });
            if(res.status === 201){
                toast.success("Logout successfull")   
            }
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }

    return(
        <MainContext.Provider value={{handleSignup, handleLogin, handleLogout}}>
            {children}
        </MainContext.Provider>
    )
}

export const useMainContext = () => {
    return useContext(MainContext);
};