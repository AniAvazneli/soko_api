import passport from "passport";
import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/auth/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(err, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export const AuthGoogle = async (req, res) => {
  passport.authenticate("google", { scope: ["email", "profile"] });
};

export const googleCallback = async (req, res) => {
  console.log(3);
  passport.authenticate("google", {
    successRedirect: "/protected",
  });
  console.log(4);
};
