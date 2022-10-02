import {Link, useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'; 
import Alert from '../components/Alert';
import { useState } from 'react';
import axiosClient from '../config/axios';

const Login = () => {
    const [email, setEmail]=useState(''); 
    const[password, setPassword]=useState(''); 
    const[alert,setAlert]=useState('');
    const {setAuth}= useAuth(); 
    const navigate= useNavigate(); 

    const handleSubmit=async(e)=>{
        e.preventDefault(); 
        if([email,password].includes('')){
            setAlert({
                msg: 'Todos los campos son obligatorios', 
                error:true
            });
            return; 
        }
        try {
            const {data}= await axiosClient.post('/users/login',{email,password});
            
            localStorage.setItem('token', data.token); 
            localStorage.setItem('user', data); 
            setAuth(data); 
            if(data.role==='Admin'){
              navigate('/admin');

            }else{
              navigate('/candidate');
            }
            
            console.log(data); 
            
        } catch (error) {
            setAlert({
                msg:error.response.data.msg, 
                error:true
            })
            
        }
    }
    const {msg}=alert; 
  return (
    <>
  {/* component */}
  <div className="bg-white dark:bg-gray-900">
    <div className="flex justify-center h-screen">
      <div
        className="hidden bg-cover lg:block lg:w-2/3"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1518378379207-3418372afea3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)"
        }}
      >
        <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
          <div>
            <h2 className="text-4xl font-bold text-white">Mr. Job Recruitment</h2>
            <p className="max-w-xl mt-3 text-gray-300">
            Nos encargamos de conseguirte las mejores oportunidades de trabajo y tambien de que administres tus clientes de la mejor forma
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
        <div className="flex-1">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">
              Mr. Job Recruitment
            </h2>
            <p className="mt-3 text-gray-500 dark:text-gray-300">
              Inicia Sesion para acceder a tu cuenta
            </p>
          </div>
          
          <div className="mt-8">
            <form onSubmit={handleSubmit}>
            {msg &&<Alert
                alert={alert}
         /> }
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@example.com"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  value={email}
                  onChange={e=>setEmail(e.target.value)}
                />
              </div>
              <div className="mt-6">
                <div className="flex justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="text-sm text-gray-600 dark:text-gray-200"
                  >
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
                  >
                    Olvidó contraseña?
                  </Link>
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Your Password"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  value={password}
                  onChange={e=>setPassword(e.target.value)}
                />
              </div>
              <div className="mt-6">
                <input type="submit"
                       className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                       value="Iniciar Sesion" />
                
              </div>
            </form>
            <p className="mt-6 text-sm text-center text-gray-400">
              No tienes cuenta todavia?{" "}
              <Link
                to="/register"
                className="text-blue-500 focus:outline-none focus:underline hover:underline"
              >
                Registrate!
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</>

    
  )
}

export default Login
