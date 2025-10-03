import express from "express";
import userController from "../controllers/userController.js"
import authMiddleware from "../middleware/Authication.js";

const userRouter=express.Router();

userRouter.get("/home",authMiddleware,(req, res) => {
    const user=req.user;
  if (!user) {
    return res.redirect("/login");
  }
  console.log(user);
    return res.render("home", { user: req.user });

});

userRouter.post("/signup",userController.Signup);

userRouter.get("/signup",(req,res)=>{
return res.render("signup");
});

userRouter.post("/login",userController.login);
userRouter.get("/login",(req,res)=>{
   return res.render("login");
})  

userRouter.get("/logout",(req,res)=>{
    

    res.clearCookie("token").redirect("/login");
})

export default userRouter;