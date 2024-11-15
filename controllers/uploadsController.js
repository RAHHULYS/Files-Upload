import { Product } from "../models/Product.js";
import path from 'path'
import  {StatusCodes} from 'http-status-codes'
import CustomError from '../errors/index.js'
import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

export const uploadProductImageLocal = async (req, res)=>{
    console.log(req.files);
    if(!req.files){
        throw new CustomError.BadRequestError('no file uploaded')
    }
    const productImage =  req.files.image
    if(!productImage.mimetype.startsWith('image')){
        throw new CustomError.BadRequestError('please upload a  image')
    }
    const maxSize = 1024 * 1024
    if (productImage.size > maxSize){
        throw new CustomError.BadRequestError('please upload image smaller than ')
    }
    const imagePath = path.join(process.cwd(), '/public/uploads/'+`${productImage.name}`)
    await productImage.mv(imagePath)
return res.status(StatusCodes.OK).json({image:{src:`/uploads/${productImage.name}`}})}

export  const uploadProductImage = async (req, res)=>{

    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath,{
        use_filename: true,
        folder:'file-upload'
    })
    fs.unlinkSync(req.files.image.tempFilePath)
    return res.status(StatusCodes.OK).json({image :{src:result.secure_url}})    
}