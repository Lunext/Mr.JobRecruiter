import express from 'express'; 
import { addJobPosition, getJobPosition, getJobPositions, updateJobPosition, deleteJobPosition
 } from '../../controllers/admin_controllers/JobPositionController.js';
 import { checkAuth, checkRole } from '../../middlewares/authMiddleware.js';

 const router=express.Router(); 
 router.route('/')
 .post(checkAuth, addJobPosition)
 .get(checkAuth, getJobPositions);

 router
 .route('/:id')
 .get(checkAuth, getJobPosition)
 .put(checkAuth, updateJobPosition)
 .delete(checkAuth, deleteJobPosition);

 export default router;
 