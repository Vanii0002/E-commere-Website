import express from "express";
import session from "express-session";
import passport from "./services/passport.js";
import dotenv from "dotenv";
import connectDB from "./services/mongo.js";
import cookieParser from "cookie-parser";
import authRoute from "./routers/authRoute.js";
import checkForAuthenticationCookie from "./middleware/authantication.js";
import cors from "cors";

dotenv.config(); // Load .env

const app = express();

// --- MIDDLEWARES --- //
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// --- SESSION SETUP --- //
app.use(
  session({
    secret: process.env.SESSION_SECRET, // required
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // dev mode, HTTPS ke liye true karna
  })
);

// --- PASSPORT INIT --- //
app.use(passport.initialize());
app.use(passport.session());

// --- CORS --- //
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// --- CUSTOM AUTH COOKIE CHECK --- //
app.use(checkForAuthenticationCookie("token"));

// --- ROUTES --- //
app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

// --- SERVER & DB CONNECT --- //
const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  try {
    await connectDB(); // MongoDB connect
    console.log("Connected to MongoDB ✅");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
});
