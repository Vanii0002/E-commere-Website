import jwt from "jsonwebtoken";
import Token from "../services/Authication.js"

const authMiddleware=(req,res,next)=>{
    const token =req.cookies?.token || null;
    if(!token)
    {
        req.user=null;
        return next()
    }
 try {
const userPayload=Token.validateToken(token);
 req.user=userPayload;
 } 
 catch (error) {
 console.log("invalid token");  
 req.user=null; 
 }
 next();
}

export default authMiddleware;