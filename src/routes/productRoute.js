import express from "express";
import { verifyToken } from "../midleware/verifyToken.js";
import {addProduct,updateProduct,deleteProduct,getAllProduct,findProductById} from "../controller/ProductController.js"
const router = express.Router();

router.get("/find",getAllProduct);
router.get("/find/:id",findProductById);
router.post("/add",addProduct);
router.put("/update/:id",updateProduct);
router.delete("/delete/:id",deleteProduct);
export default router;
