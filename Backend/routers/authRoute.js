import express from "express";
import passport from "passport";
import { register, login, logout, home, GoogleLogin } from "../controllers/authController.js";
import { initGitHubPassport } from "../controllers/authController.js";
import authRequired from "../middleware/authRequired.js";   
import User from "../models/UserModel.js";

const router = express.Router();

// ------------------ Public Routes ------------------ //
initGitHubPassport();
router.post("/register", register);
router.post("/login", login);
router.post("/GoogleLogin", GoogleLogin);


router.get("/home", async(req, res) => {
   if (!req.user) return res.status(401).json({ success: false, message: "User not logged in" });

  const user = await User.findById(req.user.user);
  if (!user) return res.status(401).json({ success: false, message: "User not found" });

  res.status(200).json({ success: true, message: `Welcome, ${user.name}` });

});





// ------------------ Github Routes ------------------ //
// GitHub login
router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
)

router.get(
  "/github/callback",

  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
      console.log("GitHub callback hit!");
    res.render("profile");
  }
); 

export default router;
