
import { verifyToken1 } from "../services/token.js";

function AdminAuth(adminToken)
{


    return (req, res, next) => {
        const tokenCookieValue = req.cookies?.adminToken;
        if (!tokenCookieValue) {

          console.log("No token cookie found");
          return next();

        }
        
        try {
            const userPayload = verifyToken1(tokenCookieValue);
            req.user = userPayload;
        } catch (error) {}
        return next();
    };

}

export function authRequired1(req, res, next) {
  const tokenCookieValue = req.cookies?.adminToken;

  if (!tokenCookieValue) {
    console.log("No token cookie found");
    return res.status(401).json({ message: "Unauthorized: No token" });
  }

  try {
    const userPayload = verifyToken1(tokenCookieValue);
    if (!userPayload) {
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
    req.user = userPayload;
    next(); 
  } catch (error) {
    console.log("Token verification failed:", error.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}

export default AdminAuth;