import express from "express";
import { verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin } from "../midleware/verifyToken.js";
import {updateUser,deleteUser,getAllUser} from "../controller/UserController.js"
const router = express.Router();
router.get("/", verifyTokenAndAdmin,getAllUser);
router.put("/update/:id", verifyTokenAndAuthorization,updateUser);
router.delete("/delete/:id",verifyTokenAndAuthorization,deleteUser);

export default router;
