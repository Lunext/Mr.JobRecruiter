import { useState, useEffect, createContext } from "react";
import  axiosClient from '../config/axios'; 

const AuthContext=createContext(); 
const AuthProvider=({children})=>{

const[loading,setLoading]=useState(true); 
const [auth, setAuth]= useState({}); 

useEffect(()=>{
    const authUser= async()=>{
        const token=localStorage.getItem('token'); 
        if(!token){
            setLoading(false)
            return
        }

        const config={
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        try{
             const{data}= await axiosClient('/users/profile', config); 
            console.log(data); 
            setAuth(data); 

        }catch(error){
            console.log(error.response.data.msg)
            setAuth({})
        }
        setLoading(false); 
        console.log('Si hay token')
    }
    authUser()
},[])

const logOut=()=>{
    localStorage.removeItem('token'); 
    setAuth({}); 
}

return(
    <AuthContext.Provider
    value={{
        auth, 
        setAuth,
        loading, 
        logOut, 
    }}
    >
       {children}
    </AuthContext.Provider>
)
}
export{
    AuthProvider 
}
export default AuthContext; 
