
import { verifyToken } from "../services/token.js";

function checkForAuthenticationCookie(cookieName)
{


    return (req, res, next) => {
        const tokenCookieValue = req.cookies?.token;
        if (!tokenCookieValue) {

          console.log("No token cookie found");
          return next();

        }
        
        try {
            const userPayload = verifyToken(tokenCookieValue);
            req.user = userPayload;
        } catch (error) {}
        return next();
    };

}

export function authRequired(req, res, next) {
  const tokenCookieValue = req.cookies?.adminToken;
  console.log(tokenCookieValue);

  if (!tokenCookieValue) {
    console.log("No token cookie found");
    return res.status(401).json({ message: "Unauthorized: No token" });
  }

  try {
    const userPayload = verifyToken(tokenCookieValue);
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

export default checkForAuthenticationCookie;