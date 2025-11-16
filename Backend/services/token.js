import JWT from "jsonwebtoken";
import dotenv from "dotenv";    

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_SECRET1=process.env.JWT_SECRET1;

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


// admin panel 

export function generateToken1(email)
{
try{
  let token= JWT.sign({email},process.env.JWT_SECRET1,{expiresIn:"7d"})
 return token

}

catch(e)
{console.log("Token erro in admin panel")}


}

export function verifyToken1(token)
{
   try {
    return JWT.verify(token, JWT_SECRET1);       

    } catch (error) {
    return null;
  } 
}



