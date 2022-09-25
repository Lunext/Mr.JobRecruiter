import { useState } from "react"
import LanguageList from "../components/Admin/LanguageList";
import LanguageForm from "../components/Admin/LanguageForm";
import { LanguageProvider } from "../context/LanguageProvider";
const ManageLanguages = () => {
  return (
    <LanguageProvider>
    <div className="flex flex-col md:flex-row">
      <div className="md:block md:w-1/2 lg:w-2/5">
        <LanguageForm/>
      </div>
      <div className="md:w-1/2 lg:w-3/5">
        <LanguageList/>
      </div>

    </div>
    </LanguageProvider>
  )
}
export default ManageLanguages
