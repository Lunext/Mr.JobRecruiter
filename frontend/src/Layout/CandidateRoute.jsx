import {Outlet, Navigate} from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Menu from '../components/Menu';
import Footer from '../components/Footer';

const CandidateRoute = () => {
    const{auth, loading}=useAuth(); 
    if(loading) return 'loading...'
  return (
    <>
     <Menu/>
     {auth?._id?(
        <main className='container mx-auto mt-10'>
            <Outlet/>
        </main>

     ):<Navigate to="/"/>}
     <Footer/>
    </>
  )
}

export default CandidateRoute;
