import Product from "../models/Product.js"
import {createError} from "../util/errorMessage.js"

export const getAllProduct= async(req,res)=>{
  try {
      let qNew=req.query.new
      let qCategory=req.query.category
      let products;
      if(qNew){
        products= await Product.find().sort({createdAt:'asc',createdAt:-1}).limit(4)
      }else if(qCategory){
        products=await Product.find({
          categories:{
            $in:qCategory
          }
        })
      }else{
        products=await Product.find()
      }
      return res.status(200).json(products);
    } catch (err) {
      createError(500,err)
    }

}
export const findProductById=async(req,res)=>{
        try {
        let product=await Product.find({_id:req.params.id})
        return res.status(200).json(product);
        } catch (error) {
          createError(500,err)
        }
}
export const addProduct= async(req,res)=>{
    try {
        const addProduct =  new Product(req.body)
        await addProduct.save()
        return res.status(200).json(addProduct);
      } catch (err) {
        createError(500,err)
      }

}
export const updateProduct= async(req,res)=>{
 
  try {
    const updateProduct = await Product.findByIdAndUpdate(req.params.id, req.body,{$new:true});
      return res.status(200).json(updateProduct);
    } catch (err) {
      createError(500,err)
    }

}
export const deleteProduct= async(req,res)=>{
 
  try {
     await Product.findByIdAndRemove({_id:req.params.id});
      return res.status(200).json({
        message:"Delete product success"
      });
    } catch (err) {
      createError(500,err)
    }

}

