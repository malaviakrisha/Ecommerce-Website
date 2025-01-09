import express from 'express'
import authMiddleware from '../middleware/auth.js';
import { workshopRegister,listRegisters } from '../controllers/workshopController.js';

const workshopRouter = express.Router();

workshopRouter.post('/place_workshop',authMiddleware,workshopRegister);
workshopRouter.get('/workshop_list',listRegisters);

export default workshopRouter