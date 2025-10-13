// Middleware to require authentication (token must be valid)
export default function authRequired(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Please login.' });
  }
  next();
}
