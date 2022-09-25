import { useState, useEffect} from "react";
import {Link} from 'react-router-dom' 
import Alert from "../components/Alert";
import axiosClient from "../config/axios";
import ROLES from "../config/roles";
import {useNavigate} from 'react-router-dom'; 


//import {useNavigate} from 'react-router-dom'

const Register=()=>{
    const navigate=useNavigate();
    const [name, setName]=useState(''); 
    const[email,setEmail]=useState(''); 
    const[roles,setRoles]=useState([]); 
    const[password,setPassword]=useState(''); 
    const[repeatPassword,setRepeatPassword]=useState(''); 
    const [alert,setAlert]=useState({});
   


    const handleSubmit=async(e)=>{
        e.preventDefault(); 
        if([name,email,roles,password, repeatPassword].includes('')){
            setAlert({msg:'Hay campos vacios!', error:true}); 
            return; 
        }
        if(password!=repeatPassword){
            setAlert({msg:'Las contraseñas no son iguales', error:true}); 
            return;
        }
        if(password.length<6){
            setAlert({msg:'La contraseña debe ser mayor a 6 caracteres', error:true});
            return;
        }
        setAlert({});
        try {
                 //Creating an user 
                const url='/users'; 
                await axiosClient.post(url,{name,email,roles,password}); 
                console.log(axiosClient.post(url,{name,email,roles,password})); 
                setAlert({
                    msg:'Creado correctamente, revisa tu correo', 
                    error: false
                })
            
        } catch (error) {
            setAlert({
                msg: error.response.data.msg, 
                error:true
            });
            
        }
    
    }
    useEffect(()=>{
      setName('')
      setPassword('')
      setRoles([])
      
    },[])
    const onRolesChanged=e=>{
        const values=Array.from(e.target.selectedOptions,option=>option.value)
        setRoles(values);
    }
    const{msg}=alert;
    return(

        <>
  {/* component */}
  <section className="bg-white dark:bg-gray-900">
    <div className="flex justify-center min-h-screen">
      <div
        className="hidden bg-cover lg:block lg:w-2/5"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")'
        }}
      ></div>
      <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
        <div className="w-full">
          <h1 className="text-3xl font-semibold tracking-wider text-gray-800 capitalize text-center dark:text-white">
            Registrate!
          </h1>
          <p className="mt-4 text-xl text-center text-gray-500 dark:text-gray-400">
            Mr. Job Recruitment
          </p>
          <div className="mt-6">
            <h1 className="text-gray-500 dark:text-gray-300">
              Selecciona tu tipo de cuenta
            </h1>
            {msg && <Alert 
                alert={alert}
                />}
          </div>
          <form onSubmit={handleSubmit}
          >
            <div className="grid-cols-1 gap-6 mt-8 md:grid-cols-2">
              <label htmlFor="role" className="block mb-2 text-sm text-gray-600 dark:text-gray-200 sr-only">
                Elige un rol
              </label>
              <select onChange={onRolesChanged}
                
                id="role"
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              > 
              <option value="Elige un rol">-- Elige un rol --</option>
                { Object.values(ROLES).map(role=>(
                        <option key={role} value={role} >{role}</option>
                ))}
              
              </select>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
            
           
            <div>
              <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                Nombre
              </label>
              <input
                type="text"
                placeholder="Tu nombre"
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                value={name}
                onChange={e=>setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                Correo electronico
              </label>
              <input
                type="email"
                placeholder="juanpablo@correo.com"
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                value={email}
                onChange={e=>setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                Password
              </label>
              <input
                type="password"
                placeholder="Introduce tu contraseña"
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                value={password}
                onChange={e=>setPassword(e.target.value)}

              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                Confirma tu contraseña
              </label>
              <input
                type="password"
                placeholder="Introduce tu contraseña nuevamente"
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                value={repeatPassword}
                onChange={e=>setRepeatPassword(e.target.value)}
              />
            </div>
            </div>
            <div className="mt-8 ">
            
            <input type="submit"
            value="Crear Cuenta" className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"/> 
            </div>
          </form>
          <nav className="mt-10 lg:flex lg:justify-between">

          <p className="text-sm text-center text-gray-400">
              Ya tienes cuenta?{" "}
              <Link
                to="/"
                className="text-blue-500 focus:outline-none focus:underline hover:underline"
              >
                Inicia Sesion!
              </Link>
              .
            </p>
            <Link
                    to="/forgot-password"
                    className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
                  >
                    Olvidó contraseña?
                  </Link>
                </nav>

            
        </div>
      </div>
    </div>
  </section>
</>

        
      
    )
}

export default Register; 
