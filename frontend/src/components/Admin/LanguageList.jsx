import useLanguage from "../../hooks/useLanguage";
import Language from "./Language";


const LanguageList = () => {
    const{languages}=useLanguage();
  return (
    <>
    
      {languages.length?(
          <>
          
            <h2 className="font-black text-3xl text-center ">Listado de Lenguajes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Administra tus{' '}
            <span className="text-gray-600 font-bold ">Lenguajes</span>
          </p>
        
          {languages.map(language=>(
            <Language
              key={language._id}
              language={language}
            />
          ))}
          </>
      ): (
        <>
          <h2 className="font-black text-3xl text-center ">No hay lenguajes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Comienza agregando lenguajes{' '}
            <span className="text-gray-600 font-bold ">y apareceran en este lugar</span>
          </p>

       </>

      )}

   </>
   
)}

export default LanguageList;
