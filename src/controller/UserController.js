import User from "../models/User.js"
import CryptoJS from "crypto-js";
import { verifyToken } from "../midleware/verifyToken.js";
export const updateUser= async(req,res,next)=>{
    if(req.body.password){
      req.body.password= CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString()
    }
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id,{$set:req.body}, {
          new: true,
        });
        return res.status(200).json(updateUser);
      } catch (err) {
        next(err);
      }

}
export const deleteUser=async(req,res,next)=>{
  try {
        await User.findByIdAndRemove(req.params.id)
        res.status(200).json('Account was deleted.')     
  } catch (err) {
    next(err)
  }

}
export const getAllUser=async (req,res,next)=>{
        try {
          const users=await User.find().sort({_id:-1})
          res.status(200).json(users)        
        } catch (error) {
          res.status(401).json(error)
        }
}

