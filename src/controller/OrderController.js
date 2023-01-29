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
        return res.status(403).json(err)
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
//get income
export const getIcome=async (req,res)=>{
  const date=new Date()
  const lastMonth=new Date(date.setMonth(date.getMonth()-1))
  const prevMonth=new Date(new Date().setMonth(lastMonth.getMonth()-1))

  console.log(prevMonth)

  try {
   const income=await Order.aggregate([
    {$match: {createdAt : {$gte:prevMonth}}},
    {
      $project: {
        month:{$month :"$createdAt"},
        sales:"$amount"
      }
    },{
      $group: {
        _id:"$month",
        total:{$sum:"$sales"}
      }
    }
   ])
   return res.status(200).json(income)
    
  } catch (err) {
    return res.status(403).json(err)
  }
}

