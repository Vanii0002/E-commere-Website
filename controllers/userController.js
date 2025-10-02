import express from "express";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

const Signup=async(req,res)=>{

  try{  
    const {FullName,Email,password}=req.body;
 const hashedPassword= await bcrypt.hash(password,10);
    const signup=await userModel.create({
    FullName,
    Email,
    password:hashedPassword,
   })
   return res.render("home");
}

catch(e)
{
console.log("Error in Sign up",e.message);
return res.status(500).json("Signup failed");
}


}

const login =async(req,res)=>{

    const {Email,password}=req.body;
try 
{
  const user=await userModel.findOne({Email})
    if(!user)
    {
   return res.render("login",{user1:"Email not registar"});
    }

    // macth password

    const isMatchpassword=await bcrypt.compare(password,user.password);
    if(!isMatchpassword)
    {
      return res.render("login",{user2:"Password Not match"}); 
    }

    // macth hogya to 

      return res.render("home",{user3:"Sucess"});

   
} 

catch (error) 
{
   console.log("Error in login",error.message);
return res.status(401).json("internal problem")  
 
}

}

export default {Signup,login};