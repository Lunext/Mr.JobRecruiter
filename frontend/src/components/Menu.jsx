import {Link} from 'react-router-dom';
import useAuth from '../hooks/useAuth';
//This is for candidate role 
const Menu = () => {
    const{logOut}=useAuth(); 
  return (
    <>
     <header className="py-10  dark:bg-gray-900" >
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
            <h1 className="font-bold text-2xl text-gray-200 text-center" >Mr. Job {' '} 
            <span className="text-white font-black" >Recruitment</span>
            </h1>
            <nav className="flex flex-col itemscenter lg:flex-row gap-4 mt-5
            lg:mt-0 ">
                <Link to="/candidate" className="text-white text-sm uppercase font-bold">DashBoard</Link>
               
                <Link to="/candidate/jobExperiences" className='text-white text-sm  uppercase font-bold'> Experiencia laboral</Link>
                <Link to="/candidate/candidates" className='text-white text-sm  uppercase font-bold'> Candidatos</Link>
                <button
                type="button" className="text-white text-sm  uppercase font-bold"
                onClick={logOut}
                >
                    Cerrar Sesion
                </button>


            </nav>
        </div>


    </header>
 
</>

   
  )
}

export default Menu;
