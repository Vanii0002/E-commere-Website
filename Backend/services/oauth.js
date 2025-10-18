import { GitHub } from "arctic";
import { env } from "./env.js";
import dotenv from "dotenv";
dotenv.config();

export const github = new GitHub({
  clientId: process.env.CLIENT_ID,       // **lowercase c** clientId
  clientSecret: process.env.CLIENT_SECRET, // **lowercase c** clientSecret
  redirectUri: `${process.env.REDIRECT_URI}/github/callback`, // lowercase u
});
