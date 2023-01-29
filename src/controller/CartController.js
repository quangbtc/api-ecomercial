import Cart from "../models/Cart.js"
import {createError} from "../util/errorMessage.js"

export const getAllCart= async(req,res)=>{
  try { 
       let carts=await Cart.find() 
      return res.status(200).json(carts);
    } catch (err) {
      createError(500,err)
    }

}
export const findCartByUserId=async(req,res)=>{
        try {
        let cart=await Cart.findOne({userId:req.params.id})
        return res.status(200).json(cart);
        } catch (error) {
          createError(500,err)
        }
}
export const addCart= async(req,res)=>{
    try {
        const addCart =  new Cart(req.body)
        await addCart.save()
        return res.status(200).json(addCart);
      } catch (err) {
        createError(500,err)
      }

}
export const updateCart= async(req,res)=>{
 
  try {
    const updateCart = await Cart.findByIdAndUpdate(req.params.id, req.body,{$new:true});
      return res.status(200).json(updateCart);
    } catch (err) {
      createError(500,err)
    }

}
export const deleteCart= async(req,res)=>{
 
  try {
     await Cart.findByIdAndRemove({_id:req.params.id});
      return res.status(200).json({
        message:"Delete cart success"
      });
    } catch (err) {
      createError(500,err)
    }

}

