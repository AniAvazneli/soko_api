import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectMongo from "./config/mongo.js";
import userRouter from "./routes/userRouter.js";
import swaggerMiddleware from "./middlewares/swagger-middleware.js";
import authRouter from "./routes/authRouter.js";
import facebookRouter from "./routes/facebookRouter.js";
import expressSession from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { googleCallback } from "./auth/google.js";
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { facebookCallback } from "./auth/facebook.js";
import eventRouter from "./routes/eventRouter.js";

const app = express();
dotenv.config();
connectMongo();

app.use(bodyParser.json());
app.use(cors())

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
      callbackURL: "https://sokoapi-production.up.railway.app/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);



passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL:'https://sokoapi-production.up.railway.app/auth/facebook/callback',
  profileFields: ['emails', 'displayName', 'name', 'picture']
}, (accessToken, refreshToken, profile, callback)=>{
  callback(null, profile)
}))


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(
  expressSession({
    secret: process.env.EXPRESS_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get(
  "/auth/google",
  cors(),
  passport.authenticate("google", { scope: ["profile email"] })
);

app.get(
  "/auth/google/callback",
  cors(),
  passport.authenticate("google"),
  googleCallback
);

app.get("/auth/facebook",cors(), passport.authenticate('facebook', {scope: ['email']}));
app.get("/auth/facebook/callback",cors(), passport.authenticate("facebook"), facebookCallback);

app.use("/api", cors(), userRouter);
app.use("/api", cors(), authRouter);
app.use("/api", cors(), eventRouter);
app.use("/", ...swaggerMiddleware());

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.listen(process.env.PORT || 3000);
