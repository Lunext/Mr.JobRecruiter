import {useEffect, useState} from 'react'; 
import {useParams, Link} from 'react-router-dom'
import Alert from '../components/Alert';
import axiosClient from '../config/axios';


const ConfirmAccout = () => {
    const [confirmmedAccount, setConfirmAccount]= useState(false); 
    const[loading, setLoading]= useState(true);
    const[alert, setAlert]=useState({}); 
    const params=useParams(); 
    const {token}=params; 

    useEffect(()=>{
        const confirmAccount=async()=>{
            try {
                const url=`/users/confirm/${token}`; 
                const {data}=await axiosClient(url); 

                setConfirmAccount(true); 
                setAlert({
                    msg:data.msg
                }
                )
                
            } catch (error) {
                setAlert({
                    msg:error.response.data.msg,
                    error:true
                }
                )
                
            }
            setLoading(false); 

        }
        confirmAccount(); 
    },[]);
      return (
        <>
        {/* component */}
        <div className="bg-white dark:bg-gray-900">
          <div className="flex justify-center h-screen">
            <div
              className="hidden bg-cover lg:block lg:w-2/3"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1576267423429-569309b31e84?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)"
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
                    Confirma tu cuenta
                  </p>
                </div>
                {!loading && <Alert
                    alert={alert}
                />}

                {confirmmedAccount &&(
                    <Link
                    to="/"
                    className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
                  >
                    Iniciar Sesion?
                  </Link>
                    
                )}
                <div className="mt-8">

    
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    
  )
}
export default ConfirmAccout
