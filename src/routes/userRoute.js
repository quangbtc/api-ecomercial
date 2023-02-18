import express from 'express';
import multer from 'multer';
import { storage, fileFilter } from '../util/uploadFile.js';
const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
});
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
router.put(
    '/update/:id',
    upload.single('avatar'),
    updateUser,
);
router.delete('/delete/:id', verifyTokenAndAuthorization, deleteUser);
router.get('/', getAllUser);

export default router;
