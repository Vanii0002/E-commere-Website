import JWT from "jsonwebtoken";
import dotenv from "dotenv";    

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export function  generateToken(user){
    // const actualUser = user.user ? user.user : user;
    // console.log("Generating token for:", actualUser)
const payload={
    _id:user._id,
    name:user.name,
    email:user.email,
};


const token =JWT.sign(payload,JWT_SECRET,{expiresIn:'1h'});
return token;
}


export const verifyToken = (token) => {
  try {
    return JWT.verify(token, JWT_SECRET);       

    } catch (error) {
    return null;
  }     
};  

