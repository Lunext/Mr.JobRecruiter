import express from 'express';

import { addEmployee, getEmployee, getEmployees, updateEmployee, deleteEmployee } from '../../controllers/admin_controllers/EmployeeController.js';
import { checkAuth } from '../../middlewares/authMiddleware.js'; 

const router=express.Router(); 
router.route('/') 
.post(checkAuth, addEmployee)
.get(checkAuth,getEmployees); 

router.route('/:id')
.get(checkAuth,getEmployee)
.put(checkAuth,updateEmployee) 
.delete(checkAuth,deleteEmployee); 

export default router; 