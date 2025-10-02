import express from "express";
import userController from "../controllers/userController.js"
const userRouter=express.Router();

userRouter.get("/",(req,res)=>{
    return res.render("home");
})
userRouter.post("/signup",userController.Signup);

userRouter.get("/signup",(req,res)=>{
return res.render("signup");
});

userRouter.post("/login",userController.login);

userRouter.get("/login",(req,res)=>{
   return res.render("login");
})

userRouter.get("/logout",(req,res)=>{
    

    res.clearCookie("token").redirect("login");
})

export default userRouter;