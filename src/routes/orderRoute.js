import express from 'express';
import { verifyToken } from '../midleware/verifyToken.js';
import {
    addOrder,
    updateOrder,
    deleteOrder,
    getAllOrder,
    findOrderByUserId,
    getIcome,
} from '../controller/OrderController.js';
const router = express.Router();

router.get('/find', getAllOrder);
router.get('/find/:id', findOrderByUserId);
router.post('/add', addOrder);
router.put('/update/:id', updateOrder);
router.delete('/delete/:id', deleteOrder);
router.get('/income', getIcome);
export default router;
