
import { verifyToken } from "../services/token.js";

function checkForAuthenticationCookie(cookieName)
{


    return (req, res, next) => {
        const tokenCookieValue = req.cookies?.[cookieName];
        if (!tokenCookieValue) {
            return next();
        }
        try {
            const userPayload = verifyToken(tokenCookieValue);
            req.user = userPayload;
        } catch (error) {}
        return next();
    };

}
// Middleware to require authentication (token must be valid)
export default function authRequired(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Please login.' });
  }
  next();
}
export default checkForAuthenticationCookie;