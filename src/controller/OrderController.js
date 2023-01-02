import Order from "../models/Order.js"
import {createError} from "../util/errorMessage.js"

export const getAllOrder= async(req,res)=>{
  try { 
       let orders=await Order.find() 
      return res.status(200).json(orders);
    } catch (err) {
      createError(500,err)
    }

}
export const findOrderByUserId=async(req,res)=>{
        try {
        let order=await Order.find({userId:req.params.id})
        return res.status(200).json(order);
        } catch (error) {
          createError(500,err)
        }
}
export const addOrder= async(req,res)=>{
    try {
        const addOrder =  new Order(req.body)
        await addOrder.save()
        return res.status(200).json(addOrder);
      } catch (err) {
        createError(500,err)
      }

}
export const updateOrder= async(req,res)=>{
 
  try {
    const updateOrder = await Order.findByIdAndUpdate(req.params.id, req.body,{$new:true});
      return res.status(200).json(updateOrder);
    } catch (err) {
      createError(500,err)
    }

}
export const deleteOrder= async(req,res)=>{
 
  try {
     await Order.findByIdAndRemove({_id:req.params.id});
      return res.status(200).json({
        message:"Delete order success"
      });
    } catch (err) {
      createError(500,err)
    }

}

