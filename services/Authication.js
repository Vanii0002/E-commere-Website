import { name } from "ejs";
import JWT from "jsonwebtoken";

const secret="Tushar@2003";

function createTokenForUser(user){
    const payload={
        _id:user._id,
        Email:user.Email,
        role:user.role
    
    
    };

  const token =JWT.sign(payload,secret);
  return token;  
}

function validateToken(token)
{
    const payload=JWT.verify(token,secret);
    return payload;

}

export default {createTokenForUser,validateToken};