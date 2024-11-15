import express from "express";
const app = express();

import { createProduct, getAllProduct } from "../controllers/productController.js";
import { uploadProductImage } from "../controllers/uploadsController.js";

app.route('/').post(createProduct).get(getAllProduct)
app.route('/uploads').post(uploadProductImage)
export default app;