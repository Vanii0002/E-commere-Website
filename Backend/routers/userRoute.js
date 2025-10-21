import express from "express";
import checkForAuthenticationCookie,  {authRequired}  from "../middleware/authantication.js";
import User from "../models/UserModel.js";
const router = express.Router();

router.get("/",authRequired, async(req, res) => {

    try{
   const user = await User.findById(req.user._id).select("-password");
    console.log("Authenticated user:", req.user);
    if(!user){
        return res.status(404).json({message:"User not found"});
    }

 res.json({
    message: `Welcome, ${user.name}`,
    user: {
        name: user.name,
        email: user.email,
        _id: user._id
    }
});

}
catch(error){
    console.error("Error in /api/auth route:", error);
    res.status(500).json({message:"Server error"});     


}});

export default router;