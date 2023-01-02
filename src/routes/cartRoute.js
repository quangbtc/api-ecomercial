import express from 'express';
import { verifyToken } from '../midleware/verifyToken.js';
import {
    addCart,
    updateCart,
    deleteCart,
    getAllCart,
    findCartByUserId,
} from '../controller/CartController.js';
const router = express.Router();

router.get('/find', getAllCart);
router.get('/find/:id', findCartByUserId);
router.post('/add', addCart);
router.put('/update/:id', updateCart);
router.delete('/delete/:id', deleteCart);
export default router;
