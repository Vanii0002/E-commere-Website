import express from "express";
import upload from "../middleware/multer.js";
import { addProduct } from "../controllers/ProductController.js";

const  productrouter=express.Router();


productrouter.get("/test",(req,res)=>{
    res.status(200).json({message:"Product route is working"});
}); 

productrouter.post("/add",upload.fields([{name:"image1",maxCount:1,},
                                                {name:"image2",maxCount:1,},
                                                {name:"image3",maxCount:1,},
                                                {name:"image4",maxCount:1,},]),
                                                addProduct)


                                    productrouter.post("/addproduct1",(req,res)=>{
    res.status(200).json({message:"Add product route is working"});
});
export default productrouter;