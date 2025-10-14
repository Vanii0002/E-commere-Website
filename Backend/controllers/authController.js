
import User from "../models/UserModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { generateToken} from "../services/token.js";   

export const register= async(req,res)=>{
try{
    const {name,email,password}=req.body;

  const existingUser= await User.findOne({email});

  if(existingUser){
    return res.status(400).json({success:false,message:"User already exists"});
  } 

  if(!validator.isEmail(email)){
    return res.status(400).json({success:false,message:"Invalid email"});
  } 

  if(!validator.isStrongPassword(password)){
    return res.status(400).json({success:false,message:"Password is not strong enough"});
  }
  
  let hassedPassword=await bcrypt.hash(password,10);


    const user= await User.create({name,email,password:hassedPassword});
    let token=generateToken({user:user._id});
    console.log(token);
    res.cookie("token",token,
    {  
  httpOnly:true,
  secure:false,
  sameSite:"strict",
  maxAge:24*60*60*1000,

    } 
    );

    res.status(201).json({success:true,message:"User registered successfully",user});     
}
catch(error){
    res.status(500).json({success:false,message:"User registration failed",error:error.message});

}    

};  

export const login= async(req,res)=>{
  try{
      const {email,password}=req.body;         
    const user= await User.findOne({email});

    if(!user){
      return res.status(400).json({success:false,message:"User does not exist"});
    }           
    const isPasswordMatch= await bcrypt.compare(password,user.password);

    if(!isPasswordMatch){
      return res.status(400).json({success:false,message:"Invalid credentials"});
    }   
        let token=generateToken({user:user._id});   
        res.cookie("token",token,
        {  
      httpOnly:true,        
      secure:false,
      sameSite:"strict",
      maxAge:24*60*60*1000,
        }
        );
        res.status(200).json({success:true,message:"User logged in successfully",user});     
  }         
    catch(error){   
        res.status(500).json({success:false,message:"User login failed",error:error.message});  
    }

    };  
    
  export const logout= async(req,res)=>{
    try{
        console.log("Logout route called");
          res.clearCookie("token");  
            res.status(200).json({success:true,message:"User logged out successfully"});
        }
        catch(error){
            res.status(500).json({success:false,message:"User logout failed",error:error.message});  
        }   
        };

export const home= async(req,res)=>{
  try{
      if(!req.user)     

          { 
            return res.status(401).json({success:true,message:"Welcome to the home page, user not logged in"});
          }

          const user= await User.findById(req.user.user);
          if(!user)
          {
            return res.status(401).json({success:true,message:"Welcome to the home page, user not logged in"});
          } 

          res.status(200).json({success:true,message:`Welcome to the home page, ${user.name}`});
      }

      catch(error){
          res.status(500).json({success:false,message:"Failed to load home page",error:error.message});  
      } 
      };

 export const GoogleLogin= async(req,res)=>{
  try{
      const {name,email}=req.body;   
         console.log('Google login data:', req.body);      
    let user= await User.findOne({email});
let hassedPassword=await bcrypt.hash("Google Auth",10);
    if(!user){
      user= await User.create({name,email, password: hassedPassword});
    }   
      
       

        let token=generateToken({user:user._id});   
        res.cookie("token",token,
        { 
      httpOnly:true,  
      secure:false,  
      sameSite:"strict",  
      maxAge:24*60*60*1000,
        } 
        );
        res.status(200).json({success:true,message:"User logged in successfully",user});     
  } 
    catch(error){
        res.status(500).json({success:false,message:"User login failed",error:error.message});
    }
    };

    export const githublogin= async(req,res)=>{
      try{
          const {name,email}=req.body;         
    let user= await User.findOne({email});
  let hassedPassword=await bcrypt.hash("Github Auth",10);   
    if(!user){
      user= await User.create({name,email, password: hassedPassword});
    } 

        let token=generateToken({user:user._id});   
        res.cookie("token",token,
        {     
      httpOnly:true,
      secure:false,
      sameSite:"strict",
      maxAge:24*60*60*1000,
        }
        );
        res.status(200).json({success:true,message:"User logged in successfully",user});     
  }
    catch(error){
        res.status(500).json({success:false,message:"User login failed",error:error.message});  
    }
    };