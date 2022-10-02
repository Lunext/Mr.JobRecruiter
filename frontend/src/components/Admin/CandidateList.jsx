import Candidate from './Candidate';
import useCandidate from '../../hooks/useCandidate';
import useJobPosition from '../../hooks/useJobPosition';
import useLanguage from '../../hooks/useLanguage';
import { useState } from 'react';
import useCompetence from '../../hooks/useCompetence';
const CandidateList = () => {
    const{candidates}=useCandidate(); 
    const[searchTerm, setSearchTerm]=useState(''); 
    const{competence}=useCompetence();
  
    const justBecause=()=>{
      candidates.competences.map((competence)=>{
          competence.description; 
      })
    }
  return (
   
    <>

    {candidates.length?(
        <>
       
          
          <h2 className="font-black text-3xl text-center ">Listado de Candidato</h2>
        <p className="text-xl mt-5 mb-10 text-center">
          Administra tus{' '}
          <span className="text-gray-600 font-bold ">Candidatos</span>
        </p>
        <div className="p-4">
  <label htmlFor="table-search" className="sr-only">
    Search
  </label>
  <div className="relative mt-1">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <svg
        className="w-5 h-5 text-gray-500 "
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
        />
      </svg>
    </div>
    <input
      type="text"
      id="table-search"
      onChange={(e) => {
        setSearchTerm(e.target.value);
      }}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Search for items"
    />
  </div>
</div>


       
        {
          candidates.filter((candi)=>{
              if(searchTerm===''){
                return candi; 
              }else if(candi.name.toLowerCase().includes(searchTerm.toLowerCase()) ||candi.cedula.toLowerCase().includes(searchTerm.toLowerCase())||candi.jobPosition.name.toString().toLowerCase().includes(searchTerm.toLowerCase())||candi.department.name.toString().toLowerCase().includes(searchTerm.toLowerCase())||candi.jobExperience.company.toString().toLowerCase().includes(searchTerm.toLowerCase()||
              [justBecause()].toString().toLowerCase().includes(searchTerm.toLowerCase()))
              ){
                return candi;
              }
          }).
        map(candidate=>(
          <Candidate
            key={candidate._id}
            candidate={candidate}
          />
        ))}
        </>
    ): (
      <>
        <h2 className="font-black text-3xl text-center ">No hay Candidatos</h2>
        <p className="text-xl mt-5 mb-10 text-center">
          Comienza agregando candidadtos{' '}
          <span className="text-gray-600 font-bold ">y apareceran en este lugar</span>
        </p>

     </>

    )}

 </>
 
   
  )
}
export default CandidateList;
