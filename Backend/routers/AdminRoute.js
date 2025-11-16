import express from "express";
import { register, login, logout, GoogleLogin, adminLogin, adminLogout } from "../controllers/authController.js";
import User from "../models/UserModel.js";
import { authRequired1 } from "../middleware/AdminAuth.js";
import { email } from "zod";

const adminrouter = express.Router();



  
adminrouter.post("/login",adminLogin);  
adminrouter.get("/logout",adminLogout);    
adminrouter.get("/p1", authRequired1, (req, res) => {
  return res.status(200).json({
    loggedIn: true,
    msg: "Welcome Admin",
    user: req.user
  });
});



export default adminrouter;
