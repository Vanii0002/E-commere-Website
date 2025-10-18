import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import dotenv from "dotenv";
import User from "../models/UserModel.js";

dotenv.config();

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/github/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        // Check if user exists with same email and provider
        let existingUser = await User.findOne({ email: profile.emails[0]?.value, provider: 'github' });

        if (existingUser) {
          return done(null, existingUser);
        }

        // Agar user nahi hai, to naya create karo
        const newUser = new User({
          name: profile.displayName || profile.username,
          email: profile.emails[0]?.value,
          password: "",        // OAuth ke liye empty
          provider: "github",
          cartDate: {},        // Default empty object
        });

        await newUser.save();
        return done(null, newUser);

      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Sessions
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
