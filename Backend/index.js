import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./services/mongo.js";
import authRoute from "./routers/authRoute.js";
import userRoute from "./routers/userRoute.js";
import checkForAuthenticationCookie from "./middleware/authantication.js";
import cors from "cors";

dotenv.config(); 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);




app.use("/api/auth", authRoute);
app.use(checkForAuthenticationCookie("token"));
app.use("/api/user", userRoute);


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
