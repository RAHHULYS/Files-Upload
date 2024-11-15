import { Product } from "../models/Product.js";
import  {StatusCodes} from 'http-status-codes'

export const createProduct = async (req, res)=>{
   console.log(req.body);
   const product = await Product.create(req.body);
   res.status(StatusCodes.CREATED).json({product})
   
}

export const getAllProduct = async (req, res)=>{
    const products = await Product.find({})
    res.status(StatusCodes.OK).json({products})
}