import express from 'express';
import {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} from '../midleware/verifyToken.js';
import {
    updateUser,
    deleteUser,
    getAllUser,
    getUserById,
} from '../controller/UserController.js';
const router = express.Router();
router.get('/find/:id', getUserById);
router.put('/update/:id', verifyTokenAndAuthorization, updateUser);
router.delete('/delete/:id', verifyTokenAndAuthorization, deleteUser);
router.get('/', getAllUser);

export default router;
