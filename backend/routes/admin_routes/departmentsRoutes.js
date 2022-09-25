import express from 'express'; 
import { addDepartment, getDepartment,getDepartments, updateDepartment,deleteDepartment} from '../../controllers/admin_controllers/DepartmentController.js';
import { checkAuth, checkRole } from '../../middlewares/authMiddleware.js';

const router=express.Router(); 
router.route('/')
.post(checkAuth,addDepartment)
.get(checkAuth,getDepartments); 

router
.route('/:id')
.get(checkAuth,getDepartment)
.put(checkAuth,updateDepartment)
.delete(checkAuth,deleteDepartment);

export default router; 