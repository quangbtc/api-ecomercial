import express from 'express';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
       
        cb(null, new Date().toISOString() +file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    //reject file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
}).fields([
    { name: 'imgProduct', maxCount: 1 },
    { name: 'thumbs', maxCount: 8 },
]);
import {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndAuthorization,
} from '../midleware/verifyToken.js';
import {
    addProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    findProductById,
} from '../controller/ProductController.js';
const router = express.Router();

router.get('/find', getAllProduct);
router.get('/find/:id', verifyToken, findProductById);
router.post('/add', upload, addProduct);
router.put('/update/:id', verifyTokenAndAuthorization, updateProduct);
router.delete('/delete/:id', verifyTokenAndAdmin, deleteProduct);
export default router;
