import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./services/mongo.js";
import authRoute from "./routers/authRoute.js";
import userRoute from "./routers/userRoute.js";
import adminrouter from "./routers/AdminRoute.js";
import checkForAuthenticationCookie from "./middleware/authantication.js";
import cors from "cors";
import AdminAuth, { authRequired1 } from "./middleware/AdminAuth.js"; 
import productrouter from "./routers/productRoute.js";

dotenv.config(); 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(
  cors({
    origin: ["http://localhost:5173","http://localhost:5174"],
    credentials: true,
  })
);



app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(checkForAuthenticationCookie("token"));
app.use(AdminAuth("adminToken"));

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/admin",adminrouter);
app.use("/api/p",productrouter)



const PORT = process.env.PORT || 8000;
app.listen(PORT,  async() => {
try{
    console.log(`Server running on http://localhost:${PORT}`);

        await connectDB();
}

catch(error){
  console.error("Failed to connect to the database:", error);
 
}

});
