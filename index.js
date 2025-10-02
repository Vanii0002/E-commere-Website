

import express from "express";
import dotenv from "dotenv";
import path from "path";
import userRouter from "./routes/userRouter.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authMiddleware from "./middleware/Authication.js";

dotenv.config();
const app=express();
const port=process.env.PORT;

mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log("Mongo connected")})
.catch(()=>{console.log("Disconnected Error")})

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.urlencoded({ extended: true })); // form data check 
app.use(express.json()); // postman test k liya 
app.use(express.static(path.resolve("./public"))) // public file ko pachna k liya 
app.use(cookieParser()) // cookie ko read krna 
app.use(authMiddleware);

app.use("/",userRouter);





app.listen(port,()=>{console.log(`Server is running ${port}`)})