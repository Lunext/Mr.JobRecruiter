import {createContext, useState, useEffect} from 'react'; 
import axiosClient from '../config/axios';
const LanguagesContext= createContext(); 
const LanguageProvider=({children})=>{
    const[languages, setLanguages] =useState([]); 
    const[language,setLanguage]=useState({}); 

    useEffect(()=>{
        const getLanguages=async()=>{
            try{
                const token=localStorage.getItem('token'); 
                if(!token) return 

                const config= {
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data}=await axiosClient('/languages', config)
                setLanguages(data); 
            }catch(error){
                console.log(error); 
            }
        }
        getLanguages();
    },[]);
    const saveLanguage=async(language)=>{
        const token= localStorage.getItem('token'); 
        const config= {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        if(language.id){
            try{
                const {data}=await axiosClient.put(`/languages/${language.id}`,language,config)
                const updatedLanguage=languages.map(languageState=>languageState._id===data._id?data:languageState);
                setLanguages(updatedLanguage);
            }catch(error){
                console.log(error); 
                return false;
            }
        }else{
            try{
                const{data}=await axiosClient.post('/languages',language,config); 
                const {createdAt, updatedAt, __v, ...savedLanguage}=data;
                setLanguages([savedLanguage,...languages]);
            }catch(error){
                console.log(error.response.data.msg); 
                return false; 
            }
        }
        return true;
    }

    const setEdit=(language)=>{
        setLanguage(language)
    }
    const deleteLanguage= async id=>{
        const confirma= confirm('Está seguro que quiere eliminarlo?')
        if(confirma){
            try{
            const token=localStorage.getItem('token');
            const config= {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const{data}=await axiosClient.delete(`/languages/${id}`,config);
            const updatedLanguages=languages.filter(languagesState=>languagesState._id!==id); 
            setLanguages(updatedLanguages);
        }catch(error){
            console.log(error); 
        }
             
        }
    }
    return (
        <LanguagesContext.Provider
          value={{
            languages,
            saveLanguage,
            setEdit,
            language,
            deleteLanguage
          }}
        >
            {children}

        </LanguagesContext.Provider>
    )
}

export{
    LanguageProvider
}
export default LanguagesContext;