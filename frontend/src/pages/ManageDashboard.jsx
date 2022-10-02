import React from 'react'
import { JobPositionProvider } from '../context/JobPositionProvider'
import Dashboard from '../components/Candidate/Dashboard'

const ManageDashboard = () => {
  return (

    <JobPositionProvider>
        <div>
        <Dashboard/>
        </div>
    </JobPositionProvider>
   
  )
}

export default ManageDashboard
