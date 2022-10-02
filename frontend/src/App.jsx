import {BrowserRouter,Routes,Route} from 'react-router-dom'; 
import AuthLayout from './Layout/AuthLayout'; 
import Login from './pages/Login'; 
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import {AuthProvider} from './context/AuthProvider'
import ConfirmAccout from './pages/ConfirmAccout';
import NewPassword from './pages/NewPassword';
import ProtectedRoute from './Layout/ProtectedRoute';
import ManageLanguages from './pages/ManageLanguages';
import { LanguageProvider } from './context/LanguageProvider';
import ManageCompetences from './pages/ManageCompetences';
import ManageDepartment from './pages/ManageDepartment';
import ManageJobPositions from './pages/ManageJobPositions';
import ManageTraining from './pages/ManageTraining';
import ManageJobExperiences from './pages/ManageJobExperiences';
import ManageCandidates from './pages/ManageCandidates';
import CandidateRoute from './Layout/CandidateRoute';
import Dashboard from './components/Candidate/Dashboard';
import ManageDashboard from './pages/ManageDashboard';
import ManageEmployees from './pages/ManageEmployees';

import ManageOffcialEmployees from './pages/ManageOffcialEmployees';
function App() {

  


  return (
    <BrowserRouter>
    <AuthProvider>
      {/* <LanguageProvider> */}

      <Routes> 
        <Route path="/" element={<AuthLayout/>}>
          <Route index element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="forgot-password" element={<ForgotPassword/>}/>
          <Route path='forgot-password/:token' element={<NewPassword/>}/>
          <Route path="confirm/:token" element={<ConfirmAccout/>}/>
        </Route>
        <Route path='/admin' element={<ProtectedRoute/>}>
          <Route index element={<ManageLanguages/>}/>
          <Route path='/admin/competences' element={<ManageCompetences/>}/>
          <Route path='/admin/departments' element={<ManageDepartment/>}/>
          <Route path='/admin/jobPositions' element={<ManageJobPositions/>}/>
          <Route path='/admin/trainings' element={<ManageTraining/>}/>
          <Route path='/admin/jobExperiences' element={<ManageJobExperiences/>} />
          <Route path='/admin/candidates' element={<ManageCandidates/>}/>
          <Route path='/admin/employees' element={<ManageEmployees/>}/>
          <Route path='/admin/recruitment' element={<ManageOffcialEmployees/>}/>
        </Route>

        <Route path='/candidate'element={<CandidateRoute/>}>

         <Route index element={<ManageDashboard/>}/>
         <Route path='/candidate/jobExperiences' element={<ManageJobExperiences/>}/>
         <Route path='/candidate/candidates' element={<ManageCandidates/>}/>
         
        </Route>
      </Routes>


      {/* </LanguageProvider> */}

    </AuthProvider>
    
    </BrowserRouter>
   
  )
}

export default App;
