import {Link} from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Sidebar = () => {
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
                <Link to="/admin" className="text-white text-sm uppercase font-bold">Lenguajes</Link>
                <Link to="/admin/competences" className='text-white text-sm  uppercase font-bold'> Competencias</Link>
                
                <Link to="/admin/departments" className='text-white text-sm  uppercase font-bold'> Departamentos</Link>
                <Link to="/admin/trainings" className='text-white text-sm  uppercase font-bold'> Capacitaciones</Link>
                <Link to="/admin/jobPositions" className='text-white text-sm  uppercase font-bold'> Puestos</Link>
                <Link to="/admin/jobExperiences" className='text-white text-sm  uppercase font-bold'> Experiencias</Link>
                <Link to="/admin/candidates" className='text-white text-sm  uppercase font-bold'> Candidatos</Link>
                <Link to="/admin/employees" className='text-white text-sm  uppercase font-bold'> Reclutamiento</Link>
                <Link to="/admin/recruitment" className='text-white text-sm  uppercase font-bold'> Empleados</Link>
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

export default Sidebar;
