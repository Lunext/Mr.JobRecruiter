import { useContext } from "react";
import LanguagesContext from "../context/LanguageProvider";

const useLanguage = () => useContext(LanguagesContext); 

export default useLanguage; 
