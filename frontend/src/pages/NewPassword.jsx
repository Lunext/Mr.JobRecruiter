import {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'; 
import Alert from '../components/Alert'; 
import axiosClient from '../config/axios';

const NewPassword = () => {
    const [password,setPassword]=useState(""); 
    const params = useParams(); 
    const[alert, setAlert]= useState({}); 
    const [modifiedPassword, setModifiedPassword]=useState(false); 
    const [validToken, setValidToken]=useState(false);
    const {token} = params; 
    useEffect(()=>{
        const checkToken=async()=>{
            try {
                await axiosClient(`/users/forgot-password/${token}`); 
                setAlert({
                    msg:'Coloca tu nueva contraseña'
                });
                setValidToken(true); 
                
            } catch (error) {
                setAlert({
                    msg:'Hubo un error con el enlace', 
                    error:true, 
                });
                
            }
        }
        checkToken();
    }, []);
    const handleSubmit=async e=>{
        e.preventDefault(); 
        if(password.length<6){
            setAlert({
                msg:'El password debe ser minimo de 6 caracteres', 
                error:true
            })
            return; 
        }
        try {
            const url=`/users/forgot-password/${token}`; 
            const {data}=await axiosClient.post(url,{password}); 

            setModifiedPassword(true); 
            setAlert({
                msg:data.msg
            })
            
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
              "url(https://images.unsplash.com/photo-1572021335469-31706a17aaef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)"
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
                Restablece tu contraseña y no pierdas acceso a tu cuenta!
              </p>
            </div>
            
            <div className="mt-8">
            {msg &&<Alert
                  alert={alert}
           /> }

           {validToken && (
           <>

              <form onSubmit={handleSubmit}>
              
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                  >
                    Nuevo Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Introduce tu contraseña"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                  />
                </div>

                 
                <div className="mt-6">
                  <input type="submit"
                         className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                         value="Guardar Nuevo Password" />
                  
                </div>
              </form>
              </>
              )}
            {modifiedPassword &&
            <Link
            to="/"
            className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
            >
            Iniciar Sesion!
            </Link>}
      
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default NewPassword
