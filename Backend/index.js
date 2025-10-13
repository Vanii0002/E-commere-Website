import express from "express";
import dotenv from "dotenv";
import connectDB from "./services/mongo.js";
import cookieParser from "cookie-parser";
import authRoute from "./routers/authRoute.js";
import cors from "cors";


dotenv.config();   
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
origin: "http://localhost:5173",  
credentials: true,
}))

const PORT = process.env.PORT || 8000;  

app.use("/api/auth", authRoute);


app.get("/", (req, res) => {
  res.send(" <h1> Hello World </h1> ");
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  
  connectDB();
});